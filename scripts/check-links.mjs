import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const siteFile = path.join(root, "lib/site.ts");
const URL_PATTERN = /https?:\/\/[^\s)"'<>\]]+/g;
const TIMEOUT_MS = Number(process.env.LINK_CHECK_TIMEOUT_MS ?? 20000);
const CONCURRENCY = Number(process.env.LINK_CHECK_CONCURRENCY ?? 5);
const USER_AGENT =
  "Mozilla/5.0 (compatible; DEAIDEV-LinkCheck/1.0; +https://de-ai-dev-portfolio.vercel.app)";
const BOT_CHALLENGE_HOSTS = new Set(["linkedin.com", "www.linkedin.com"]);
const BOT_CHALLENGE_STATUSES = new Set([403, 429, 999]);
const UNVERIFIABLE_HOSTS = new Map([
  ["linkedin.com", "LinkedIn blocks automated requests (HTTP 999)"],
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() && entry.name.endsWith(".mdx") ? [fullPath] : [];
  });
}

function normalize(url) {
  return url.replace(/[.,;:!?]+$/, "");
}

function collectFromContent() {
  return walk(contentDir).flatMap((file) => {
    const source = fs.readFileSync(file, "utf8");
    return (source.match(URL_PATTERN) ?? []).map(normalize);
  });
}

function defaultSiteUrl(name) {
  if (!fs.existsSync(siteFile)) return undefined;

  const source = fs.readFileSync(siteFile, "utf8");
  const match = source.match(
    new RegExp(`${name}\\s*\\?\\?\\s*"(https?:\\/\\/[^"]+)"`)
  );
  return match?.[1];
}

function collectSiteLinks() {
  return [
    process.env.NEXT_PUBLIC_GITHUB_URL ?? defaultSiteUrl("NEXT_PUBLIC_GITHUB_URL"),
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      defaultSiteUrl("NEXT_PUBLIC_LINKEDIN_URL"),
  ].filter(Boolean);
}

const links = [...new Set([...collectFromContent(), ...collectSiteLinks()])].sort();

async function check(url) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      await response.body?.cancel();

      if (response.status >= 200 && response.status < 300) {
        return { url, ok: true, status: response.status };
      }

      const host = new URL(response.url || url).hostname.replace(/^www\./, "");
      if (
        BOT_CHALLENGE_HOSTS.has(host) &&
        BOT_CHALLENGE_STATUSES.has(response.status)
      ) {
        return {
          url,
          ok: true,
          skipped: true,
          status: response.status,
          reason: "bot challenge (not a dead link)",
        };
      }

      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === 2) {
        return {
          url,
          ok: false,
          status: response.status,
          reason: response.statusText || "Non-200 response",
        };
      }
    } catch (error) {
      if (attempt === 2) {
        return {
          url,
          ok: false,
          status: 0,
          reason: error instanceof Error ? error.message : "Request failed",
        };
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
  }
}

async function run() {
  if (links.length === 0) {
    console.log("Link check: no external links found.");
    return;
  }

  const skipped = [];
  const checkable = [];

  for (const url of links) {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const reason = UNVERIFIABLE_HOSTS.get(host);
    if (reason) skipped.push({ url, status: "SKIP", reason });
    else checkable.push(url);
  }

  console.log(
    `Link check: ${links.length} external link(s), ${checkable.length} checked.`
  );

  const failures = [];
  let cursor = 0;

  async function worker() {
    while (cursor < checkable.length) {
      const url = checkable[cursor];
      cursor += 1;
      const result = await check(url);
      if (!result.ok) failures.push(result);
      else if (result.skipped) skipped.push(result);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, checkable.length) }, worker)
  );

  for (const result of skipped) {
    console.warn(`  SKIP ${result.status === "SKIP" ? "" : result.status} ${result.url} (${result.reason})`);
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      const status = failure.status || "ERR";
      console.error(`  FAIL ${status} ${failure.url} (${failure.reason})`);
    }
    console.error(
      `Link check failed: ${failures.length} of ${links.length} link(s) did not return 200.`
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `Link check passed: every checkable external link returned 200${
      skipped.length > 0 ? ` (${skipped.length} bot challenge skipped)` : ""
    }.`
  );
}

run();

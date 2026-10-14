const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://de-ai-dev-portfolio.vercel.app";

export const siteUrl = raw.replace(/\/$/, "");

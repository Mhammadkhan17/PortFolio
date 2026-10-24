const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://de-ai-dev-portfolio.vercel.app";

export const siteUrl = raw.replace(/\/$/, "");

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@dearidev.dev";

export const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/dearidev";

export const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/dearidev";

const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://de-ai-dev-portfolio.vercel.app";

export const siteUrl = raw.replace(/\/$/, "");

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mhammadkhan740@gmail.com";

export const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Mhammadkhan17";

export const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ??
  "https://www.linkedin.com/in/hammad-khan-32b7972b7";

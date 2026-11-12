# DEAIDEV portfolio

The portfolio for Hammad Khan (DEAIDEV), a solo full-stack developer. Built with Next.js App Router, local MDX, Tailwind CSS, Archivo, and DM Mono.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

- Project case studies: `content/projects/*.mdx`
- Blog posts: `content/blog/*.mdx`
- Product and design intent: `../PRODUCT.md`, `../DESIGN.md`

Frontmatter drives SEO, project metadata, and card copy. Links set to `#` are treated as unavailable and are not rendered.

## Checks

```bash
npm run lint
npm run typecheck
npm run check:links
npm run build
```

`npm run build` runs `check:links` first (via `prebuild`) and fails if any external link in the MDX content or the site-wide social URLs does not return 200.

## Deploy

Deployed on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the canonical origin before a production rollout.

# DEAIDEV portfolio

The portfolio for Hammad Khan (DEAIDEV), a solo full-stack developer. Built with Next.js App Router, local MDX, Tailwind CSS, Inter, and IBM Plex Mono.

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
npm run build
```

## Deploy

Deployed on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the canonical origin before a production rollout.

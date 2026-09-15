# Portfolio Todo List

## Phase 0: Project Foundation

- [x] Initialize Next.js 16.3: `npx create-next-app@latest my-app --yes --eslint`
- [x] Enable TypeScript strict mode in tsconfig.json (enabled by default)
- [x] Move plan.md, todo.md, changelog.md, AGENTS.md into project
- [x] Install dependencies: next-themes, next-mdx-remote, rehype-pretty-code
- [x] Create folder structure: components/, content/, lib/, public/images/

## Phase 1: Layout & Navigation

- [x] Create root layout.tsx with Geist fonts
- [x] Build Header component (client component for theme toggle) with nav links
- [x] Build Footer component with GitHub + LinkedIn
- [x] Build mobile menu toggle (client component for state)
- [x] Add dark/light mode toggle (next-themes, client component)
- [x] Set up global styles and CSS variables (design tokens)

## Phase 2: Home Page

- [x] Build Hero section with name and tagline
- [x] Add CSS entrance animations (fade-in with delays)
- [x] Create featured projects preview section (3 curated)
- [x] Add CTA buttons (View Projects, Contact Me)

## Phase 3: About Page

- [x] Create About page layout
- [x] Add bio section (3 paragraphs, first person, placeholder content)
- [x] Build Skills section (grouped by category: Frontend, Backend, Tools, Cloud)
- [x] No progress bars — skills as inline text
- [x] Build Experience section: 2 roles with impact-focused bullets

## Phase 4: Projects Page

- [x] Create projects listing page with URL search params filter
- [x] Build ProjectList component (title, description, tech tags, demo/code links)
- [x] Add category filter (frontend, fullstack, tool)
- [x] Set up MDX with next-mdx-remote and gray-matter
- [x] Create project detail page template with CASE format
- [x] Add 3 sample projects (1 frontend, 1 full-stack, 1 tool)
- [x] Use async params for dynamic routes (awaited in Next.js 16.3)
- [x] Created lib/projects.ts utility for reading MDX files

## Phase 5: Blog

- [x] Create blog listing page
- [x] Create blog post detail page with MDX rendering
- [x] Add reading time estimation (200 words/min)
- [x] Add 1 sample blog post (MDX)
- [x] Created lib/blog.ts utility for reading MDX files
- [x] Server Components for MDX rendering (no client-side JS)

## Phase 6: Contact

- [x] Create Contact page layout
- [x] Add mailto link with pre-filled subject/body
- [x] Add social links: GitHub, LinkedIn

## Phase 7: Polish & Accessibility

- [x] Add SEO meta tags (Metadata API)
- [x] Add Person schema (JSON-LD) for SEO
- [x] Add sitemap.xml and robots.txt (Next.js Metadata API)
- [x] Add error.tsx and not-found.tsx (error boundaries)
- [ ] Accessibility improvements (semantic HTML, ARIA labels)
- [ ] Lighthouse audit (target 95+)
- [ ] Final responsive testing

## Phase 8: Landing Page (DESIGN.md compliant)

- [x] Rewrite page.tsx with full landing page sections
- [x] Hero: split-screen (text left, terminal right), clamp() typography, stats
- [x] Features: zig-zag layout per DESIGN.md (no 3-column)
- [x] Projects: dynamic grid from MDX content with tech badges
- [x] Testimonials: 3 cards with quote icons and avatar initials
- [x] Pricing: 3 tiers, middle highlighted, buttons aligned at bottom
- [x] Final CTA: email + schedule call buttons
- [x] Footer: social icons (SVG), navigation links, copyright 2026
- [x] Header: sticky nav, mobile hamburger, "Let's Talk" CTA
- [x] Button system: .btn-primary (black bg, white text, cyan hover), .btn-secondary (outline)
- [x] CSS: design tokens, JetBrains Mono font, focus-visible rings
- [x] Animations: 420ms entry, 200ms hover, scaleX underline (no layout-trigger)
- [x] Cards: default shadow (0 2px 12px rgba(0,0,0,0.06)), hover state
- [x] Responsive: all sections collapse below 768px
- [x] SEO: meta tags, Open Graph, JSON-LD Person schema, sitemap, robots
- [x] Smooth scroll with scroll-padding-top for sticky header
- [x] Removed redundant Tech Stack section
- [x] Removed pulse-glow infinite animation
- [x] Fixed: button active state (translateY(0) for press feedback)
- [x] Fixed: transition restricted to transform/box-shadow (no "all")
- [x] Fixed: entry animation translate 20px → 16px per spec

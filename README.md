# Videography portfolio

A small, static-first portfolio site for a camera operator / videographer: **Latvian**, **English**, and **Russian**, with basic SEO (metadata, hreflang alternates, sitemap, robots, JSON-LD). Built with **Next.js 15** (App Router), **Tailwind CSS 4**, and **next-intl**.

## Prerequisites

- Node.js 20+ (recommended)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requests to `/` are redirected to the default locale (`/lv`).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |

## Customizing content

### Translations (UI copy)

Edit the JSON files under [`messages/`](messages/):

- [`messages/lv.json`](messages/lv.json)
- [`messages/en.json`](messages/en.json)
- [`messages/ru.json`](messages/ru.json)

Namespaces match usage in components (for example `Nav`, `Home`, `Work`, `Contact`, `Footer`, `PortfolioItems`, `Metadata`).

### Site identity and social links

Edit [`src/content/site.ts`](src/content/site.ts):

- `personName` — shown in the header, footer, and JSON-LD `Person` schema.
- `social` — Instagram, YouTube, optional Telegram/Vimeo (`null` hides a network in the UI).

### Portfolio entries

Edit [`src/content/portfolio.ts`](src/content/portfolio.ts):

- Each item has an `id`, optional `featured` (shown on the home page), and translation keys that map to `PortfolioItems` in the message files.
- Use `type: "placeholder"` for static demo cards, or `type: "youtube"` with a `youtubeId` for an embedded player (prefer **Unlisted** or **Public** YouTube URLs for embedding; **Private** does not embed for anonymous visitors).

### Default locale

Defined in [`src/i18n/routing.ts`](src/i18n/routing.ts) as `defaultLocale` (currently `lv`). The language switcher links to the same path in another locale.

## SEO and production URL

- **Canonical URLs and Open Graph** use [`src/lib/site-url.ts`](src/lib/site-url.ts). Set **`NEXT_PUBLIC_SITE_URL`** to your production origin (for example `https://your-domain.com`) on Vercel so metadata, `sitemap.xml`, and `robots.txt` point at the correct host. During Vercel previews, `VERCEL_URL` is used when the public URL is unset.
- After launch, submit the sitemap in [Google Search Console](https://search.google.com/search-console) and verify the domain.

## Deploying to Vercel

1. Push the repository to GitHub (or GitLab / Bitbucket).
2. Create a new Vercel project and import the repo; framework preset **Next.js**.
3. Add environment variable **`NEXT_PUBLIC_SITE_URL`** with your live site URL (no trailing slash required; the code normalizes it).
4. Deploy. The default output is a Node server (`next build`); no extra config is required for a standard Next app.

## Layout note

The layout is **desktop-first** (comfortable from about 1024px width). Smaller viewports still work but are not the primary design target.

# Sanity CMS Setup

This project now supports live content from Sanity while keeping a safe local fallback.

## 1) Create a local env file

Copy `.env.example` to `.env` and fill values:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-01
```

## 2) In your Sanity project, create a singleton document

Create one document of type:

- `siteSettings`

Expected fields shape:

- `socials`:
  - `instagram` (string)
  - `tiktok` (string)
  - `youtube` (string)
  - `email` (string)
- `navItems[]`:
  - `href` (string)
  - `label` (string)
- `storySections[]`:
  - `id` (string)
  - `label` (string)
- `hero`:
  - `eyebrow` (string)
  - `titleTop` (string)
  - `titleBottom` (string)
- `about`:
  - `eyebrow` (string)
  - `title` (string)
  - `paragraphs` (array of strings, at least 2)
  - `stats[]`:
    - `n` (string)
    - `l` (string)
- `whatWeDo`:
  - `eyebrow` (string)
  - `title` (string)
  - `items[]`:
    - `icon` (string, one of: `flame`, `trophy`, `trendingUp`, `sparkles`, `film`)
    - `title` (string)
    - `desc` (string)
- `community`:
  - `eyebrow` (string)
  - `title` (string; supports line breaks with `\n`)
  - `body` (string)
  - `pills` (array of strings)
- `contact`:
  - `eyebrow` (string)
  - `title` (string; supports line breaks with `\n`)
  - `body` (string)

## 3) Run locally

```bash
npm install
npm run dev
```

If Sanity vars are missing or invalid, the app automatically falls back to local typed defaults.

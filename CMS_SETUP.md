# Sanity CMS Setup (Complete)

This website already supports live content from Sanity with automatic fallback to local defaults when Sanity is not configured.

## 1) Frontend env setup (optional)

Copy `.env.example` to `.env` only if you want to override defaults:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-01
```

## 2) Create Sanity Studio project

Run this in any folder (outside this website repo is fine):

```bash
npm create sanity@latest
```

Then follow prompts to create/connect your Sanity project.

## 3) Copy schema files into Sanity Studio

This repo includes ready schema files in `sanity-schema/`:

- `siteSettings.ts`
- `schemaTypes.ts`
- `singletons.ts`
- `deskStructure.ts`
- `sanity.config.example.ts`

Copy these into your Studio codebase and wire imports exactly as shown in `sanity.config.example.ts`.
In the Studio config, replace:

- `projectId: "YOUR_PROJECT_ID"`
- `dataset: "production"` (or your dataset)

## 4) Create/update the singleton document

In Sanity Studio, edit the single document:

- type: `siteSettings`
- document id: `siteSettings`

The singleton helpers in `singletons.ts` + `deskStructure.ts` are already prepared for this behavior.

## 5) Run and verify

Website (this repo):

```bash
npm install
npm run dev
```

Sanity Studio (your Studio repo):

```bash
npm install
npm run dev
```

If env vars are missing or Sanity is unavailable, the site still works using local typed defaults in `src/content/siteContent.ts`.

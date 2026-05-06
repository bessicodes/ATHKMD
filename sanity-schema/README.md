# Sanity schema pack (copy/paste)

This folder contains ready TypeScript files you can paste into your Sanity Studio project.

Files:
- `siteSettings.ts` - main website content schema
- `schemaTypes.ts` - exports schema array
- `singletons.ts` - singleton restrictions for `siteSettings`
- `deskStructure.ts` - desk menu with one `Site Settings` document
- `sanity.config.example.ts` - example Studio config wiring all of the above

## How to use in your Sanity Studio project

1. Copy all files into your Studio (for example into `schemaTypes/` or `schemas/`).
2. Update import paths in `sanity.config.ts` if needed.
3. In `sanity.config.ts`, set real `projectId` and `dataset`.
4. Start Studio and create/edit the single `Site Settings` document.

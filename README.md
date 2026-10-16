# La Chingada Toronto

Mexican street food, fresh masa and a proper bar on Dundas West. This repository contains the public restaurant website and its local development setup.

## Run locally

Use Node.js 22.13 or newer. In PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev:windows
```

Open http://127.0.0.1:7332. If this computer's trusted network certificate is not picked up by Node, use `$env:NODE_USE_SYSTEM_CA='1'` with Node 24 or newer before installation/startup. Keep certificate verification enabled.

```powershell
npm.cmd run typecheck
npm.cmd test
```

`npm test` builds the production Worker and runs its rendered HTML regression checks. `npm run build:windows` builds without running tests. The existing Linux/Sites deployment workflow continues to use `npm run build`; deployment identity and bindings remain in `.openai/hosting.json` and `vite.config.ts`.

## Content and identity

- `app/menu-data.ts`: menu items, CAD prices, dietary labels, Happy Hour food/drinks and AYCE rules. The HTML menu and interactive homepage share this source.
- `app/page.tsx`: homepage, menu browsing, specials, catalogue entry and reservation window. Primary booking links retain a native provider destination before JavaScript loads.
- `app/agave/page.tsx` and `app/components/AgaveCollection.tsx`: dedicated searchable bottle catalogue, source-linked detail dialogs, category filters and pagination. The collection is excluded from the homepage bundle.
- `app/components/TacoPicker.tsx`: craving-based taco trios, regular menu totals and dish-detail links; uses the shared menu data.
- `app/components/ChingadaArcade.tsx`, `ArcadeArt.tsx`, `CraftMarks.tsx`: arcade/prize disclosures and the matching graphic system. Prizes remain proposed.
- `app/components/Brand.tsx`, `public/brand/`, `public/fonts/`: corn mark, wordmark, favicon/social assets and self-hosted OFL typefaces.
- `app/globals.css`: responsive visual system, accessible focus states and overlay styling.
- `app/agave-{data,archive,catalog}.ts`, `app/house-infusions.ts`: preserved collection records. `app/agave-research-data.json` adds checked sources, corrected names/categories and approved transparent bottle assets. Research batches and provenance live in `reports/agave-research-*.json`; merge with `node scripts/merge-agave-research.mjs`. Unverified photos use named camera placeholders.
- `app/site-config.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`: canonical domain, shared contact/link configuration and search metadata.

Public routes: `/`, `/menu`, `/happy-hour`, `/all-you-can-eat-tacos`, `/patio`, `/brunch`, `/our-story`, `/arcade`, `/agave`. Brunch remains explicitly coming soon until the restaurant confirms its launch.

Set build-time `NEXT_PUBLIC_ARCADE_URL` and `NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN=false` for the playable owner staging arcade. With no override the older ChatGPT prototype remains the fallback and is labelled as requiring sign-in. Table play at the venue and merch, gift-card and free AYCE prizes are still in preparation. No prize competition is active.

The production canonical is `https://lachingada.ca`. Noncanonical Worker hosts receive `X-Robots-Tag: noindex, follow`. The `www` host and retired WordPress landing/author URLs redirect to the preferred domain. Already deployed obsolete Netlify sites require their own hosting redirects; this repository cannot change those hosts.

## Reservations and orders

Set build-time `NEXT_PUBLIC_RESERVATION_URL` to the Rezzo staging preview to use its demo in both the iframe and native booking links. Empty or absent configuration falls back to `https://rezzo.bodhix.io`. Rezzo's matching redesign is in `Yo-Its-Bodhi/rezzo`, branch `codex/rezzo-staging`; its owner preview uses two explicit server flags and sample state. Delivery keeps the restaurant's existing order.store link.

## Owner staging

`node scripts/preview-server.mjs` serves the built restaurant through a small HTTP gateway (default loopback port 8787, Worker 8786). Override `PORT`, `WORKER_PORT`, `PREVIEW_HOST` and `PREVIEW_STATE_DIR` as needed. Development management/editor endpoints and WebSocket upgrades are blocked. The Dockerfile runs this gateway as an unprivileged user, with the Worker bound only to loopback. Build URL overrides into the image using its public build arguments. No live database is used by this restaurant package.

See `reports/STAGING-MILESTONES.md`, `reports/STAGING-REVIEW.md` and `reports/HANDOFF.md` for the completed checks, owner review journey, staging limits and links to the other repositories. Temporary HTTPS tunnel URLs change when tunnels restart; rebuild all public cross-links before sharing replacement URLs.

## Audit and handoff

- `reports/AUDIT.md`: baseline findings and evidence.
- `reports/BRAND.md`: palette, fonts, identity assets and photo optimization.
- `reports/PHOTO-SLOTS.md`: named camera placeholders and instructions for adding each missing food photograph.
- `reports/AGAVE-PHOTO-SLOTS.md`: the remaining 46 bottle/house-infusion camera slots, exact inventory IDs and research reasons.
- `reports/DRIVE-PHOTOS.md` and `reports/NEW-PHOTOS.md`: provenance for owner-provided menu, kitchen, restaurant and patio photos.
- `reports/PHOTO-AUDIT.md`: inherited bottle-photo corrections, when available.
- `reports/SEO-PLAN.md`: implementation and account/hosting work for search visibility.
- `reports/HANDOFF.md`: final verification and remaining launch actions.

The review branches and staging builds do not deploy the business domain or replace live Rezzo. Checks do not establish Google ranking, live conversion rates or field Core Web Vitals.

# Arcade release check

## Current staging release · 15 October 2026

The expanded arcade and preview gateway are committed and pushed on `codex/arcade-preview` at `bf4576183fc22628624252702707920792eee9c9`. Fresh validation passes 354 tests, TypeScript, production build and five integration suites against isolated local D1, including all four multiplayer games, 12 Kitchen stations, six racing tracks, queues and social permissions. Public HTTPS routes/assets/API, exact-origin enforcement, noindex, blocked management paths and migration persistence were verified. Owner URLs and the browser walkthrough are in `STAGING-REVIEW.md`.

The native preview runs behind the new HTTP gateway with its Worker bound only to loopback. No hosted database was migrated or replaced. Production dependency audit is clean; 12 build-tool findings remain documented in the arcade repository. Container execution, physical tilt/restaurant Wi-Fi/printed QR checks and group playtests remain launch checks. The older source check below is retained as historical evidence, not the current deployment state.

## Historical source check · 14 October 2026

Checked 14 October 2026 against the existing local arcade checkout:
`C:/Users/dj_ba/Documents/Codex/2026-10-12/https-github-com-yo-its-bodhi/work/la-chingada-arcade`.

## Source and hosting identity

- Branch: `main`, tracking `origin/main` at `2d171e6` (`Save La Chingada vision and home PC handoff`). The current expanded arcade remains uncommitted in this checkout.
- Remote: `https://github.com/Yo-Its-Bodhi/la-chingada-arcade.git`.
- Existing Sites identity: `appgprj_6acaab0dd86c81918c3839966578a290`, retained in `.openai/hosting.json`.
- Existing preview: `https://taco-smack-table.lachingada1242.chatgpt.site/`.
- D1 binding: `DB`. R2 is not configured. The generated local Wrangler config uses the intentional placeholder database UUID; it is not the hosted database identity.
- A GitHub push does not deploy Sites. The existing project should be updated through the Sites workflow so its hosted database and previous scores remain connected.

## Fresh checks

| Check | Result |
| --- | --- |
| `npm test` | Passed: 330 tests, zero failures/skips |
| Local TypeScript `tsc --noEmit` | Passed |
| `npm run build` | Passed; deployable Worker/client output generated |
| `git diff --check` | Passed; line-ending notices only |

The build includes the four original games, Corn Circuit, Learning Kitchen, leaderboards, rewards, Explore Mexico, race verification records and the corresponding APIs. Its remaining size warning concerns the lazy Three.js racing world chunk (539.7 KiB minified). The renderer is imported when racing starts rather than loaded as part of the homepage. Vinext's uncertain static route classification message is informational.

No local preview was listening on port 5173 during this check. The five fixture-writing local API scripts were deliberately not run under this task's read-only database restriction. Their earlier recorded passes are historical; this report claims only the fresh checks above. No source, database, permissions, guest preferences, score records or hosted state were changed by this check.

## Database release dependency

The migration journal includes eight migrations in order:

1. `0000_long_jazinda.sql` — initial players, rooms and scores.
2. `0001_woozy_banshee.sql` — global score index.
3. `0002_fresh_alex_power.sql` — per-game scores; existing scores default to Taco Smack.
4. `0003_first_baron_zemo.sql` — server-issued runs.
5. `0004_wakeful_warbound.sql` — room discovery, heartbeat and replay fields.
6. `0005_safe_triton.sql` — guest credentials.
7. `0006_social_permissions.sql` — optional social preferences and audit history.
8. `0007_corn_circuit.sql` — separate racing rooms, seats and immutable lap records.

Apply only migrations not already recorded against the existing hosted D1 database, in order. Do not replay earlier ALTER statements or replace the hosted database with a fresh one. The last two migrations are handwritten; the checkout warns that matching Drizzle snapshots must be established before generating later automatic migrations.

## Preview boundaries

The source is ready to package based on the fresh automated checks. Publishing still depends on access to the existing Sites project and successful application of its pending hosted migrations. Neither was attempted here.

Prizes remain planned with no active competition. The subsequent narrow rewards update adds a ticket graphic/card for proposed free AYCE taco entries beside gift cards and merch, subject to confirmation. Status, FAQ and page metadata retain the future 18+ eligibility and no automatic awards. Eighteen relevant rewards/hub/social-permission tests, a fresh TypeScript check and another production build passed after that copy change. Physical phone/tilt/Wi-Fi tests, printed QR scans, family playtests and chef approval for educational Kitchen methods remain outstanding. They do not prevent an explicitly requested review preview, but the preview must not be presented as proof that these checks are complete.

Commit-readiness filename/size checks found no environment files, database files, runtime directories or ZIPs among source candidates. Existing `.npmrc` is unchanged. `.dev.vars` and `.dev.vars.*` are now ignored. Public assets total approximately 36.4 MiB, with the largest retained original PNG at 3.24 MiB.

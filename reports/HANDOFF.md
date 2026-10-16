# La Chingada staging handoff

15 October 2026. Review branches preserve the proposal; the business domains and live reservation service are unchanged. Current demo links and the owner walkthrough are in [STAGING-REVIEW.md](STAGING-REVIEW.md); the execution checklist is [STAGING-MILESTONES.md](STAGING-MILESTONES.md).

## Delivered experience

One corn mark and wordmark, self-hosted Barlow Condensed/DM Sans, marigold, chile, teal, ink and white connect the restaurant, arcade and reservation demo. The homepage leads with real food and daily Mexican-corn tortillas, then photo-led menu/special cards, a craving-based taco trio picker, illustrated craft disclosures, venue/patio photographs and the arcade feature.

The menu preserves 87 active dishes and five explicitly planned brunch records, prices, dietary descriptions and offer conditions. Native links work before JavaScript; enhanced homepage booking opens staged Rezzo in a focus-managed window with direct-link/telephone fallbacks and a real iframe reload. Nine crawlable routes have unique metadata, canonicals, Restaurant/Menu/breadcrumb markup and a nine-page sitemap. Preferred-host/retired-WordPress redirects remain; preview hosts are noindex.

The dedicated Agave Library has accent-insensitive search, styles, result counts, 24-record pagination, transparent cutouts and source-linked dialogs. Historical notes are separately labelled and collapsed; researched identity/category/facts override conflicts. La Pinta is a commercial pomegranate liqueur, and Don Julio 1942 filters as añejo.

All 178 inventory IDs/names remain accounted for: 173 verified or owner-sourced expressions, 132 approved transparent photos. Forty-six photo gaps remain named—26 house infusions and 20 commercial records without a sufficiently verified cutout. Five commercial identities remain unresolved. The 132 delivery files total approximately 10.96 MB, loaded lazily. Approximately 92.95 MB of redundant originals are preserved in ignored work folders outside the public package. Online source URLs remain in the reports. La Pinta background removal with ImageGen is recorded in its provenance.

The arcade includes five games, private/table rooms, separate rankings, racing, Learning Kitchen and Explore Mexico. Its gateway blocks development endpoints; its Worker listens only on loopback and staging writes require the exact configured public origin. Its D1 state is isolated from hosted data. Merch, gift cards and free AYCE entries remain proposed prizes; no competition is active.

Rezzo matches the identity through availability, details, confirmation and management. The production-built preview requires both exact server flags REZZO_DEMO_MODE=true and REZZO_DEMO_PREVIEW=true, displays its sample-data notice, uses in-memory reservations and suppresses notifications. No live database, production volumes or messaging credentials are supplied. Restaurant/menu links return to staging.

## Verification

- Restaurant: TypeScript, ESLint (zero errors/warnings), production build and **27 tests** passed. Tests run the built Worker in workerd and validate routes/schema/metadata/assets/redirects/noindex plus every inventory record and approved photo, including decoded alpha, dimensions and package hashes.
- Public restaurant: **147 checks** passed—nine routes, all 132 approved bottle assets over HTTPS, four blocked development paths and both linked applications. Cross-links use the staged destinations.
- Browser restaurant/library: all taco craving modes/shuffle totals; ingredient search/category reset; dish Escape/focus return; AYCE terms/booking transition; mobile navigation/booking focus return; loaded Rezzo iframe; library pagination/filter/search/empty reset and bottle dialog/source/keyboard behaviour. Current desktop and 390-pixel phone layouts were checked; earlier colour/photo work was also reviewed at 320, 768 and 1618 pixels. Screenshots are in screenshots/.
- Rezzo: **145 tests in 16 files**, lint, TypeScript, standalone build and public assets/demo isolation checks passed. A synthetic browser booking retained guest details after changing time, confirmed and was retrieved through management. The within-24-hour phone-only policy remained in force. Only made-up contacts were used.
- Arcade: **354 tests**, TypeScript, build and five isolated integration suites passed: round replay validation, all four table games, all 12 Kitchen stations, optional social permissions and all six racing tracks/rooms/queues. Restart preserved local records and all eight migration entries. Public origin rejection, routes/assets/API and blocked endpoints were checked.
- Browser arcade: Taco Smack scored/saved 10 points and Freeze worked; Churro Curling aim/launch scored/saved 60 points; a private table lobby opened and was left; the 3D racing world rendered and entered countdown. Automated room/replay checks cover deeper multiplayer/racing flows. Physical phone tilt and restaurant Wi-Fi play remain launch checks.
- Production dependency audit reports zero findings for all three apps. The arcade records 12 build-tool findings separately. The restaurant retains known-working Vinext after a newer adapter produced a real Worker manifest error; Next/React, Vite, Wrangler and the Cloudflare plugin were patched and the final runtime rechecked.

## Hosting and source

Branches: Yo-Its-Bodhi/chingada → codex/la-chingada-redesign; Yo-Its-Bodhi/la-chingada-arcade → codex/arcade-preview; Yo-Its-Bodhi/rezzo → codex/rezzo-staging. Clickable links are in the owner review.

The Hostinger server-list connection timed out. This release uses verified temporary HTTPS tunnels with normal certificate validation. URLs last while this computer, local services and tunnels run, and change when tunnels restart. Rebuild public cross-links when addresses change. Ignored process/log/check metadata is in work/staging/.

All three repositories include container packages; [deploy/README.md](../deploy/README.md) describes their isolated Compose setup for a later VPS host. No Docker engine is available locally, so Linux image/container execution is unverified. Existing Sites identities/bindings are preserved; GitHub push alone does not deploy Sites.

## Production launch decisions

Confirm the design, current prices/inventory, missing genuine photos, brunch launch and arcade venue/prize rules before production rollout. Retire old Netlify previews at their own hosts and complete Google Business Profile/Search Console work in SEO-PLAN.md. Rankings, field Core Web Vitals and conversion changes require live measurement; first place on Google is not guaranteed. Chef review of learning content, physical phone/tilt tests, restaurant Wi-Fi/printed QR tests and group playtests remain launch checks.

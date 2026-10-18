# La Chingada staging handoff

Updated 17 October 2026. Review branches preserve the proposal; the business domains and live reservation service are unchanged. Current preview links, availability and the owner walkthrough are in [STAGING-REVIEW.md](STAGING-REVIEW.md); the execution checklist is [STAGING-MILESTONES.md](STAGING-MILESTONES.md).

## Delivered experience

One corn mark and wordmark, self-hosted Barlow Condensed/DM Sans, marigold, chile, teal, ink and white connect the restaurant, arcade and reservation demo. The homepage leads with real food and daily Mexican-corn tortillas, then photo-led menu/special cards, a craving-based taco trio picker, illustrated craft disclosures, venue/patio photographs and the arcade feature.

The menu preserves 87 active dishes and five explicitly planned brunch records, prices, dietary descriptions and offer conditions. Native links work before JavaScript; enhanced homepage booking opens staged Rezzo in a focus-managed window with direct-link/telephone fallbacks and a real iframe reload. Nine crawlable routes have unique metadata, canonicals, Restaurant/Menu/breadcrumb markup and a nine-page sitemap. Preferred-host/retired-WordPress redirects remain; preview hosts are noindex.

The dedicated Agave Library has accent-insensitive search, styles, result counts, 24-record pagination, transparent cutouts and compact source-linked dialogs. Image/title/price lead, aroma and palate sit beside the image, technical facts follow, and story/production precede sources. Existing tasting copy is preserved; researched identity/category/facts override conflicts. La Pinta is a commercial pomegranate liqueur, and Don Julio 1942 filters as añejo.

All 191 stored inventory records remain accounted for: 165 public commercial bottles and 26 unpublished house infusions. All 191 identities are verified or owner-sourced, and all 165 public bottles have approved transparent photos. The 21 formerly empty commercial photo slots are filled; the remaining 26 slots belong only to hidden house infusions. The delivery photos total 13,732,994 bytes (13.73 MB). Owner photos identify Clase Azul Durango, Del Maguey Vida Puebla, Serpiente Tobalá Joven and Siete Misterios Espadín/Cuishe Ensamble. A display guard prevents old mismatched aroma, palate and technical notes from leaking into these clarified records. Exact venue batch strengths for Tobalá/Ensamble remain unasserted. Native producer/importer photos and built-in ImageGen background extraction retain source and editing provenance in the research batches; redundant originals remain outside the public package. See [AGAVE-PHOTO-REPAIR.md](AGAVE-PHOTO-REPAIR.md).

The read-only inventory reconciliation covers all 163 mezcal/tequila rows in the supplied **SPIRITS** worksheet: names in B41:B71 and B73:B204, sell prices in the corresponding G cells. It added 13 bottles (179–191), updated 12 existing prices and supplied Bosscal (68) at $16. There are 163 public cards with supplied selling prices; records 79 and 120 remain unpriced. The generic PANTELONES sheet label does not identify a Pantalones expression. Existing records 79 and 85 remain preserved despite their absence from that sheet. No purchase costs, stock counts or unrelated business data were copied. New research and provenance are in [agave-research-d.json](agave-research-d.json); the minimal name/price reconciliation is in [agave-inventory-reconciliation.json](agave-inventory-reconciliation.json), with the read-only extraction retained in ignored work/staging/.

The arcade includes five games, private/table rooms, separate rankings, racing, Learning Kitchen and Explore Mexico. Its gateway blocks development endpoints; its Worker listens only on loopback and staging writes require the exact configured public origin. Its D1 state is isolated from hosted data. Merch, gift cards and free AYCE entries remain proposed prizes; no competition is active.

Rezzo matches the identity through availability, details, confirmation and management. The production-built preview requires both exact server flags REZZO_DEMO_MODE=true and REZZO_DEMO_PREVIEW=true, displays its sample-data notice, uses in-memory reservations and suppresses notifications. No live database, production volumes or messaging credentials are supplied. Restaurant/menu links return to staging.

## Verification

Current, 17 October:

- The restaurant photo update is production-built. Its regression suite checks routes/schema/metadata/assets/redirects/noindex, all inventory records, approved photo decoding/alpha/dimensions/package hashes, owner-upload provenance and corrected display-data precedence. The final result is recorded in the photo repair report.
- The restaurant preview currently returns **HTTP 502**. Automatic approval review rejected its restart after the rebuild with “blocked by policy.” No alternate process launch was attempted. Its existing tunnel remains available for a normal manual foreground launch; see README.md for the exact command.
- Earlier **158 public checks** and desktop/390-pixel browser checks passed for the previous 144-photo build. Those checks are not a claim that the new 165-photo build has been viewed live. Public asset and browser verification must resume after the restaurant restarts.
- Arcade returns **HTTP 502**. Automatic approval review rejected all three attempted background launches, including the 127.0.0.1 option. No state changed, and reconnecting an account is not required.

Earlier audit snapshot, 15 October (not a claim of current arcade availability):

- Restaurant lint/TypeScript and browser flows passed: taco picker, menu controls, dish/dialog keyboard behaviour, AYCE booking, navigation, Rezzo iframe, library filters/pagination and source links. Earlier responsive reviews included 320, 390, 768 and 1618 pixels; screenshots are in screenshots/.
- Rezzo passed **150 tests in 17 files**, lint, TypeScript, standalone build and demo-isolation checks. A synthetic booking using made-up contacts confirmed and was retrieved through management; the within-24-hour phone-only policy remained in force.
- Arcade passed **354 tests**, TypeScript, build and five isolated integration suites covering replay validation, four table games, 12 Kitchen stations, social permissions and six racing tracks/rooms/queues. Restart preserved local records and all eight migrations. Browser checks exercised Taco Smack, Churro Curling, a private lobby and racing countdown.
- Production dependency audits reported zero findings for all three apps; 12 arcade build-tool findings were recorded separately. The restaurant retained working Vinext after a newer adapter failed its Worker manifest; related runtime/build dependencies were patched and checked.

## Hosting and source

Branches: Yo-Its-Bodhi/chingada → codex/la-chingada-redesign; Yo-Its-Bodhi/la-chingada-arcade → codex/arcade-loopback-preview; Yo-Its-Bodhi/rezzo → codex/rezzo-staging. Clickable links are in the owner review. Arcade loopback fix **624a75d** is saved remotely on the new review branch because codex/arcade-preview advanced in another chat; the other 24 racing changes were preserved.

The Hostinger server-list connection timed out. The previews use temporary HTTPS tunnels with normal certificate validation. Restaurant and arcade currently have no running origin and return 502 after automatic approval review rejected their launches; Rezzo is separate. URLs last while this computer, local services and tunnels run, and change when tunnels restart. Rebuild public cross-links when addresses change. Ignored process/log/check metadata is in work/staging/.

All three repositories include container packages; [deploy/README.md](../deploy/README.md) describes their isolated Compose setup for a later VPS host. No Docker engine is available locally, so Linux image/container execution is unverified. Existing Sites identities/bindings are preserved; GitHub push alone does not deploy Sites.

## Production launch decisions

House-infusion cards remain unpublished. Supplied bottled-spirit prices appear at the top right of each public card; unknown prices retain accessible “Ask at the bar” wording. The compact bottle-detail follow-up removes the long archive disclaimer while preserving existing tasting information and verified facts.

Confirm the design, current prices/inventory, missing genuine photos, brunch launch and arcade venue/prize rules before production rollout. Retire old Netlify previews at their own hosts and complete Google Business Profile/Search Console work in SEO-PLAN.md. Rankings, field Core Web Vitals and conversion changes require live measurement; first place on Google is not guaranteed. Chef review of learning content, physical phone/tilt tests, restaurant Wi-Fi/printed QR tests and group playtests remain launch checks.

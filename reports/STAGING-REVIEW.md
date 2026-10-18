# La Chingada owner review

Updated 17 October 2026. These are temporary owner-demo addresses, not replacements for the live restaurant or booking service.

| Preview | Address | Current status |
| --- | --- | --- |
| Restaurant | [Open restaurant](https://roads-needs-almost-manuals.trycloudflare.com/) | **Unavailable: HTTP 502; restart blocked by automatic approval review** |
| Agave Library | [Open collection](https://roads-needs-almost-manuals.trycloudflare.com/agave#collection) | Built with 165 photos; shares the restaurant's unavailable preview service |
| Arcade | [Arcade preview](https://patrol-expressed-newman-harris.trycloudflare.com/) | **Unavailable: HTTP 502** |
| Rezzo demo | [Open sample booking](https://evolution-actions-ship-plot.trycloudflare.com/) | Available; sample data, noindex |

Available URLs depend on this computer staying awake and their local services/tunnels running. A tunnel restart generates a different address. The GitHub sources and container packages are saved independently; restarting a tunnel does not deploy or change the business domains.

Restaurant and arcade tunnels are online but their local services are unavailable. Automatic approval review rejected the restaurant restart after its photo rebuild, and earlier rejected three arcade launches. The reason provided was “blocked by policy.” No alternate process launch was attempted after the restaurant rejection. No account reconnection is needed. Source, built artifacts and isolated data remain saved. The restaurant's manual foreground launch command is in README.md.

## Suggested five-minute walkthrough

1. Open the restaurant. Start with the imported-corn story, food photography and tortilla-process disclosures. Try the taco trio picker, then a dish detail and the menu category/search controls.
2. Open the weekly offers. Booking opens the redesigned Rezzo preview within the restaurant; its visible demo notice explains that sample details make no real reservation.
3. Enter the dedicated Agave Library from the main navigation. Search a producer, filter a style, open a bottle and follow its sources. Named camera slots show exactly which photos are still needed.
4. The arcade walkthrough is deferred while its preview returns 502. Once the service is available, try a solo round, private table room, racing, Learning Kitchen and Explore Mexico. Merch, gift cards and free AYCE entries remain proposed prizes; no active competition awards them.
5. Open Rezzo directly on a phone. Pick guests and a time, enter made-up details and move back/forward through the flow. The menu/restaurant links return to this staging website. Sample reservations reset when its process restarts.

## What is ready

- One corn-led identity across all three applications: matching typography, icons, marigold, chile red, teal, ink and white.
- Nine crawlable restaurant routes, 87 active menu items and five clearly planned brunch dishes. Prices and offer terms are preserved from the supplied business records.
- 191 stored library records: 165 public commercial bottles and 26 hidden house infusions. All public cards have approved transparent photos, with 21 newly filled gaps. Owner confirmations resolve Durango, Vida Puebla, Tobalá Joven and Espadín/Cuishe Ensamble; conflicting historical notes are suppressed for clarified expressions. Confirmed prices cover 163 public bottles; records 79 and 120 retain “Ask at the bar.”
- All 163 mezcal/tequila rows in the supplied SPIRITS worksheet are reconciled (names B41:B71 and B73:B204; sell prices G). This adds 13 bottles, updates 12 existing prices and prices Bosscal at $16. Historical records 79/85 are preserved; the generic PANTELONES label does not establish an expression-specific price.
- Five arcade games, table-room flows, rankings, racing, Kitchen and Mexico experiences are implemented and saved; the current preview service is unavailable.
- Rezzo production-built demo, isolated from live database and notification services.

The photo update is production-built with all 165 approved assets. Its final local test result is recorded in [AGAVE-PHOTO-REPAIR.md](AGAVE-PHOTO-REPAIR.md). Earlier public verification passed **158 checks** for the previous 144-photo build; that result does not verify the new build over HTTPS. Public/browser checks must resume after the restaurant preview restarts. Earlier full application audits are dated in [HANDOFF.md](HANDOFF.md).

## Items deliberately left visible

Only the 26 unpublished house-infusion photo slots remain; no public commercial card lacks a photo. Research/provenance is retained in `agave-research-a.json` through `agave-research-d.json`; exact historical names/IDs are preserved. Approved delivery photos total 13.73 MB. The confirmed Siete Misterios Ensamble is Espadín/Cuishe; its venue batch ABV and Serpiente Tobalá's venue strength are not assumed from differently dated market photos. Redundant originals stay outside the public package.

Halloumi and other missing food/venue shots keep named camera placeholders. Brunch is coming soon. Arcade prizes, venue operation and eligibility/redemption details need restaurant confirmation. No checkout, gift-card sale or prize redemption is implied by the artwork.

The VPS connector did not return a server list. This delivery uses temporary HTTPS tunnels; it is not a durable VPS deployment. `../deploy/README.md` describes the isolated container package for a future staging host. A Docker engine is unavailable on this Windows machine, so Linux container execution remains unverified.

Technical SEO is implemented and the preview is noindex. Google first place, live field performance and restaurant-wide conversion improvements require publishing and measurement; local checks cannot establish those outcomes. Physical phone tilt, restaurant Wi-Fi/QR play, four-person playtesting and chef review of educational content remain launch checks.

## GitHub review branches

- [Restaurant](https://github.com/Yo-Its-Bodhi/chingada/tree/codex/la-chingada-redesign)
- [Arcade loopback preview](https://github.com/Yo-Its-Bodhi/la-chingada-arcade/tree/codex/arcade-loopback-preview) — fix 624a75d saved remotely. The older codex/arcade-preview branch advanced in another chat; its other 24 racing changes were preserved.
- [Rezzo](https://github.com/Yo-Its-Bodhi/rezzo/tree/codex/rezzo-staging)

These review branches preserve the proposal without merging it into the live applications.

## Restarting the temporary Windows preview

Use Node 24 and the three saved review branches. The current portable Cloudflare helper is in ignored `work/tools/cloudflared.exe`; if it is absent, obtain it from Cloudflare’s official distribution. Keep certificate verification enabled.

These are operating instructions, not a claim that the arcade restart succeeded. Its background launches remain blocked by automatic approval review as described above.

Start one tunnel for each local port (7344 restaurant, 7343 arcade, 7341 Rezzo) with `cloudflared tunnel --url http://127.0.0.1:PORT --protocol quic --no-autoupdate`. Keep the tunnel processes running and record their newly printed HTTPS addresses. Then rebuild public cross-links using those addresses:

- Restaurant: set `NEXT_PUBLIC_ARCADE_URL`, `NEXT_PUBLIC_RESERVATION_URL`, and `NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN=false`; run `npm run build:windows`. Set `PORT=7344` and `WORKER_PORT=7345`, then `npm run preview:staging`.
- Arcade: set `NEXT_PUBLIC_RESTAURANT_URL` and run `npm run build`. Set `PORT=7343`, `ARCADE_PREVIEW_PUBLIC_ORIGIN` to its exact HTTPS origin, and `ARCADE_PREVIEW_STATE_DIR` to an absolute project-local writable folder. Run `node scripts/start-preview.mjs`. Reuse the same state folder to preserve this preview’s scores/migrations. See its `docs/VPS_PREVIEW.md` for the full contract.
- Rezzo: set `NEXT_PUBLIC_RESTAURANT_URL` and `NEXT_PUBLIC_MENU_URL` before `npm run build`. Copy `public` to `.next/standalone/public` and `.next/static` to `.next/standalone/.next/static` (Next standalone does not copy these itself). Set `PORT=7341`, `HOSTNAME=127.0.0.1`, `NODE_ENV=production`, `REZZO_DEMO_MODE=true`, and `REZZO_DEMO_PREVIEW=true`; run `node .next/standalone/server.js`. Supply no database or messaging credentials. See its `docs/STAGING_PREVIEW.md`.

Recheck all three public URLs, the restaurant booking iframe, arcade write API and the Rezzo sample-data notice before sharing replacement links. Closing a tunnel or sleeping/restarting the computer interrupts its temporary URL. For a continuously available owner preview, use the separate Compose package on a configured HTTPS staging host.

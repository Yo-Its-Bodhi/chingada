# La Chingada owner review

Prepared 15 October 2026. These are temporary owner-demo addresses, not replacements for the live restaurant or booking service.

| Preview | Address |
| --- | --- |
| Restaurant | https://outlets-seemed-allergy-pit.trycloudflare.com/ |
| Agave Library | https://outlets-seemed-allergy-pit.trycloudflare.com/agave |
| Arcade | https://avatar-nat-rose-consultancy.trycloudflare.com/ |
| Rezzo demo | https://int-foto-wales-expenditure.trycloudflare.com/ |

The URLs work while this computer stays awake and the three local services and Cloudflare tunnels run. A tunnel restart generates a different address. The GitHub sources and container packages are saved independently; restarting a tunnel does not deploy or change the business domains.

## Suggested five-minute walkthrough

1. Open the restaurant. Start with the imported-corn story, food photography and tortilla-process disclosures. Try the taco trio picker, then a dish detail and the menu category/search controls.
2. Open the weekly offers. Booking opens the redesigned Rezzo preview within the restaurant; its visible demo notice explains that sample details make no real reservation.
3. Enter the dedicated Agave Library from the main navigation. Search a producer, filter a style, open a bottle and follow its sources. Named camera slots show exactly which photos are still needed.
4. Open the arcade. Try a solo round, a private table room, the racing preview, Learning Kitchen and Explore Mexico. Merch, gift cards and free AYCE entries remain proposed prizes; no active competition awards them.
5. Open Rezzo directly on a phone. Pick guests and a time, enter made-up details and move back/forward through the flow. The menu/restaurant links return to this staging website. Sample reservations reset when its process restarts.

## What is ready

- One corn-led identity across all three applications: matching typography, icons, marigold, chile red, teal, ink and white.
- Nine crawlable restaurant routes, 87 active menu items and five clearly planned brunch dishes. Prices and offer terms are preserved from the supplied business records.
- 178 library records, 173 verified or owner-sourced expressions, and 132 exact-expression photos approved for transparent delivery. All 132 assets are checked beyond the first page of the catalogue.
- Five arcade games, table-room flows, game-specific rankings, racing, educational Kitchen and Mexico experiences.
- Rezzo production-built demo, isolated from live database and notification services.

## Items deliberately left visible

Forty-six library photo slots remain: 26 restaurant-made infusions need photographs of the actual house bottles, and 20 commercial records lack a sufficiently verified transparent match. Five commercial identities remain unresolved, including broad or conflicting historical names. Details and source attempts are in `agave-research-a.json`, `agave-research-b.json` and `agave-research-c.json`; exact historical names/IDs are preserved.

Halloumi and other missing food/venue shots keep named camera placeholders. Brunch is coming soon. Arcade prizes, venue operation and eligibility/redemption details need restaurant confirmation. No checkout, gift-card sale or prize redemption is implied by the artwork.

The VPS connector did not return a server list. This delivery uses temporary HTTPS tunnels; it is not a durable VPS deployment. `../deploy/README.md` describes the isolated container package for a future staging host. A Docker engine is unavailable on this Windows machine, so Linux container execution remains unverified.

Technical SEO is implemented and the preview is noindex. Google first place, live field performance and restaurant-wide conversion improvements require publishing and measurement; local checks cannot establish those outcomes. Physical phone tilt, restaurant Wi-Fi/QR play, four-person playtesting and chef review of educational content remain launch checks.

## GitHub review branches

- Restaurant: https://github.com/Yo-Its-Bodhi/chingada/tree/codex/la-chingada-redesign
- Arcade: https://github.com/Yo-Its-Bodhi/la-chingada-arcade/tree/codex/arcade-preview
- Rezzo: https://github.com/Yo-Its-Bodhi/rezzo/tree/codex/rezzo-staging

These review branches preserve the proposal without merging it into the live applications.

## Restarting the temporary Windows preview

Use Node 24 and the three saved review branches. The current portable Cloudflare helper is in ignored `work/tools/cloudflared.exe`; if it is absent, obtain it from Cloudflare’s official distribution. Keep certificate verification enabled.

Start one tunnel for each local port (7344 restaurant, 7343 arcade, 7341 Rezzo) with `cloudflared tunnel --url http://127.0.0.1:PORT --protocol quic --no-autoupdate`. Keep the tunnel processes running and record their newly printed HTTPS addresses. Then rebuild public cross-links using those addresses:

- Restaurant: set `NEXT_PUBLIC_ARCADE_URL`, `NEXT_PUBLIC_RESERVATION_URL`, and `NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN=false`; run `npm run build:windows`. Set `PORT=7344` and `WORKER_PORT=7345`, then `npm run preview:staging`.
- Arcade: set `NEXT_PUBLIC_RESTAURANT_URL` and run `npm run build`. Set `PORT=7343`, `ARCADE_PREVIEW_PUBLIC_ORIGIN` to its exact HTTPS origin, and `ARCADE_PREVIEW_STATE_DIR` to an absolute project-local writable folder. Run `node scripts/start-preview.mjs`. Reuse the same state folder to preserve this preview’s scores/migrations. See its `docs/VPS_PREVIEW.md` for the full contract.
- Rezzo: set `NEXT_PUBLIC_RESTAURANT_URL` and `NEXT_PUBLIC_MENU_URL` before `npm run build`. Copy `public` to `.next/standalone/public` and `.next/static` to `.next/standalone/.next/static` (Next standalone does not copy these itself). Set `PORT=7341`, `HOSTNAME=127.0.0.1`, `NODE_ENV=production`, `REZZO_DEMO_MODE=true`, and `REZZO_DEMO_PREVIEW=true`; run `node .next/standalone/server.js`. Supply no database or messaging credentials. See its `docs/STAGING_PREVIEW.md`.

Recheck all three public URLs, the restaurant booking iframe, arcade write API and the Rezzo sample-data notice before sharing replacement links. Closing a tunnel or sleeping/restarting the computer interrupts its temporary URL. For a continuously available owner preview, use the separate Compose package on a configured HTTPS staging host.

# La Chingada: search audit and launch plan

Baseline audit: 13 October 2026, Toronto. Final implementation review: 14 October 2026. Canonical business domain: https://lachingada.ca.

The redesign creates useful search destinations for the restaurant's actual experiences. The goal is qualified discovery, visits and reservations. No technical change guarantees first place for every Toronto query: Google's local results depend on relevance, distance and prominence, including reviews and links. [Google's local ranking guidance](https://support.google.com/business/answer/7091).

## Verified business information

The business website and repository agree on 1242 Dundas Street West, Toronto, ON M6J 1X5; 416-535-2242; reservations@lachingada.ca. Current opening hours are Sunday noon–9 PM, Monday–Wednesday 4–10 PM, Thursday–Saturday noon–11 PM. Reservations support up to six guests. Patio seating is first come, first served and weather dependent.

Daily Happy Hour is 4–7 PM: twelve $6 food items, $10 margaritas, $2 off beer, $6 bar rail and 20% off wine bottles. The food menu runs all day Wednesday. Thursday AYCE tacos are $29.95 with fourteen choices and a one-hour limit. Specials are dine-in only. The repository contains the exact food, drink and service details used in the new pages.

Brunch is explicitly **coming soon**. Planned Saturday/Sunday hours are 10 AM–2 PM; no launch date has been announced. Preview dishes are labelled upcoming and excluded from active menu structured data. Standard restaurant hours and current services remain the basis for Restaurant schema.

Food craft claims are supported by the owner request, current site and repository: Mexican corn is imported, then cooked, ground into masa, pressed and grilled in-house daily. The public site describes one tonne every six months. Do not imply hand-pressing, a named corn variety, geographic farm origin, organic certification or awards without evidence.

## What the live audit found

The existing homepage already had server-rendered HTML, one H1, title/description/canonical tags, social metadata and Restaurant JSON-LD. Those foundations were preserved and extended.

| Live finding | Evidence | Action |
|---|---|---|
| Retired previews are public and indexable | https://silver-wisp-3f23fe.netlify.app/ and https://fabulous-pika-bb56d3.netlify.app/ returned HTTP 200; no canonical, robots meta or X-Robots-Tag. Both contain incorrect reservation phone 416-535-4424. | If retired, redirect to the main domain. Restrict future previews. This requires control of the old hosts. |
| Menu URL points to an image | https://lachingada.ca/menu/ redirected to /wp-content/uploads/2025/06/menu.png, an approximately 9.6 KB PNG. | Route /menu to the new complete HTML menu when deploying. |
| No offer landing pages | /happy-hour/, /patio/ and /brunch/ returned 404. | New server-rendered, useful pages now exist. |
| Sitemap promotes irrelevant pages | /wp-sitemap-posts-page-1.xml listed only / and /5628-2/; user sitemap listed /author/andrew/. | Serve the new sitemap; replace the old sitemap declaration when deploying. |
| Junk WordPress pages are indexable | /5628-2/ returned 200 with title “home2324 – La Chingada”; /author/andrew/ returned 200 with title “Andrew Hall – La Chingada”. | Permanent redirects for both URLs are implemented in the new Worker. They take effect when that Worker serves the business domain. |
| Images in code schema/sitemap did not exist | margarita-rocks-lineup.svg and margarita-program-hero.webp had no corresponding assets. | Replaced references with the real margarita-patio-photo.webp. |
| Initial document preloaded seven images | Hero, mascot and below-fold images competed for initial bandwidth. | The redesign prioritizes its actual hero, uses responsive optimized photographs and defers below-fold media. Two small self-hosted font files are preloaded. |
| Search snapshot had a day-sensitive Monday offer label | A current search crawl showed “Happening today Monday”. | Treat day/time labels as client enhancements; render stable weekly information for initial HTML. |

The reservation integration https://rezzo.bodhix.io returned HTTP 200, title “Reserve | La Chingada”, and the correct phone link. No test booking was submitted. Delivery-link business identity was verified from the site's link; a purchase was not attempted.

## Implemented search architecture

| Route | Customer purpose | Search content |
|---|---|---|
| / | Decide whether to visit | Mexican restaurant in Toronto, fresh tortilla craft, food, drink and Dundas West location |
| /menu | Choose food and drinks | Complete active menu with current repository prices, ingredients and dietary labels; Menu/MenuSection/MenuItem schema |
| /happy-hour | Understand the offer | Exact hours, food/drink prices, Wednesday exception, dine-in conditions and FAQ |
| /all-you-can-eat-tacos | Plan a Thursday visit | $29.95, fourteen choices, one-hour limit, ordering rules and FAQ |
| /patio | Plan an outdoor visit | Real patio image, weather policy, first come first served, location and visit details |
| /brunch | Check launch status | Explicit coming-soon status; planned service and upcoming menu preview |
| /our-story | Understand why the food is different | Owner-supported imported-corn and daily tortilla process, house bar preparation |

Each page has a unique title, description, canonical, social metadata and visible breadcrumb schema. The central Restaurant entity uses a stable @id, real images, correct contact information and opening hours, and route-specific menu/offer URLs. A full sitemap includes every public editorial route. No fabricated reviews, review ratings, awards or unsupported opening hours are marked up.

Editorial pages also render visible breadcrumb navigation; every page has proper header, main and footer landmarks and a skip link. The old development-preview metadata was removed. The Wordmark, corn icon, favicon, social card and schema logo use the new shared identity. Typography is self-hosted rather than fetched from Google Fonts.

The Worker adds `X-Robots-Tag: noindex, follow` on noncanonical preview hosts while the official business domain remains indexable. Requests for `www.lachingada.ca` permanently redirect to HTTPS on the preferred domain, preserving the path and query. The retired WordPress landing page and Andrew author archive permanently redirect to the homepage, preserving their query strings. These behaviors were exercised against the packaged Worker; they do not retire separately hosted Netlify sites.

The extracted app/menu-data.ts keeps food/drink prices and offer rules in a shared source for the homepage and HTML menu. Update this source when the business menu changes. Multi-price wine/water items keep their visible serving prices; numeric structured offers are only emitted for unambiguous single prices.

## Deployment work

1. Deploy the finished application to the verified business domain; preserve the connected reservation and ordering services. Verify all seven public routes return 200 on the deployed host.
2. Attach the business domain and its www alias to the finished deployment. Verify the implemented www and retired WordPress redirects at the live host. Remove the old menu-image redirect so /menu serves the new HTML page. Retire obsolete Netlify hosts through their own hosting controls.
3. Point robots.txt at the new sitemap. Submit it in Google Search Console; inspect the homepage and each intent page with URL Inspection. Check that Google's selected canonical matches the declared business domain.
4. Use Google's Rich Results Test for Restaurant and breadcrumbs. Check menu schema in Schema.org's validator. Inspect the actual rendered HTML; metadata alone does not make content useful.
5. Verify the new icon/social card, absolute image URLs, booking modal, delivery link, phone links and mobile layout at the live domain.
6. Recheck real Core Web Vitals after deployment. Optimize actual LCP images and fonts before adding more scripts. Local performance scores are lab evidence, not real-user results.

## Separate reservation application

The embedded and directly linked booking service remains https://rezzo.bodhix.io. An independent HTTPS source check on 14 October returned HTTP 200 with title “Reserve | La Chingada”, the correct phone, its existing `/Logo.png` asset, Geist/Impact typography and the earlier “Serious food. Questionable behaviour.” wording. It has not adopted this repository's corn mark, Barlow Condensed/DM Sans typefaces and new visual system. Its booking contact is hola@lachingada.ca, while the restaurant website uses reservations@lachingada.ca.

Rebrand that separate application as a launch follow-up so the complete reservation experience shares the restaurant identity; confirm which contact alias should appear. Keep its real booking rules and functioning reservation flow intact. This repository styles the surrounding modal and fallbacks but does not control the external document. No booking or purchase was submitted during verification.

## Business Profile and local reputation work

These require the business's Google/account access and were not changed by repository work:

- Verify/maintain the Google Business Profile. Use the actual business name; choose accurate primary and secondary categories. Complete menu, reservation, order, hours, special-hours and relevant patio attributes.
- Keep address, phone, domain and hours consistent across official social accounts, ordering listings and established local directories. Correct the wrong phone in retired previews and any copied listings.
- Add current authentic photographs: food, margaritas, tortilla work, exterior, entrance, room and patio. Real kitchen/venue material will support both conversion and local discovery.
- Invite honest reviews after service without gating, incentives or prescribed keywords; reply helpfully to both praise and criticism.
- Pursue legitimate Toronto food/community coverage grounded in the imported-corn and daily masa story. Strong relevant mentions and links matter more than mass directory submissions.
- Announce brunch only once operational. Update website status, schema hours if applicable, Business Profile and public announcements together.

## Measurement

Record a prelaunch baseline in Search Console and Business Profile performance. Review non-brand search impressions/clicks for Mexican food, Dundas West tacos, happy hour, all-you-can-eat tacos, margaritas and patio; compare branded queries separately. Track useful actions such as booking starts/completions, calls, directions and order clicks with an agreed privacy-conscious analytics setup. Review after several weeks, then iterate using actual queries and conversion data rather than arbitrary keyword density.

## Primary guidance

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google local ranking factors](https://support.google.com/business/answer/7091)
- [Google LocalBusiness/Restaurant structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

## Local implementation checks

All six editorial routes returned HTTP 200 from localhost:7332. Each rendered one H1, its own title and business-domain canonical, plus Restaurant and BreadcrumbList JSON-LD. The menu additionally rendered Menu schema. The sitemap and robots endpoints returned HTTP 200, and the removed development-preview marker was absent from each page. These are development-server checks; the final production build and deployed-domain checks remain part of launch verification.

Final repository validation resolved the earlier homepage imports and Cloudflare type declarations: the repository-wide TypeScript check passes. Nineteen rendered production-Worker regression checks passed, covering route HTML/metadata/schema, the complete menu, offer terms, pending brunch, packaged assets, sitemap/robots, unknown-page 404s, permanent redirects and preview noindex behavior. Source review confirms that schema prices, cuisine, hours, contact details and offers agree with the visible website and shared menu data. Deployed-domain checks remain a launch task; these local results do not establish search ranking or real-user Core Web Vitals.

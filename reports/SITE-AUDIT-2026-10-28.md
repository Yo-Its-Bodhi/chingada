# Restaurant staging audit — 28 October 2026

The restaurant preview, full food and drink menu, offers, Agave Library, booking demo and arcade integration were reviewed. The live restaurant and live booking database were not changed.

## Findings and fixes

- The Agave Library's region search did not include origins displayed from house notes. Search now indexes the same displayed facts, and duplicate source URLs are shown only once. Five dead guest-facing source links were refreshed; historical fact-source references are retained for provenance. All 165 public bottle photos returned HTTP 200, and prices matched the saved inventory reconciliation except the two deliberately unpriced entries.
- The special-offer dialog's full-menu link now goes to `/menu`. Wednesday's all-day food promotion now labels Happy Hour drinks as 4–7 PM. The homepage menu search identifies its selected category. The tortilla-process copy and dynamic footer year were corrected.
- The reservation dialog now keeps a visible call/reload fallback, including on mobile. The previous iframe could report a successful load even when a cross-origin DNS error appeared. A separate Rezzo preview was restored with both production-demo flags, sample memory only and outbound notifications disabled: https://sin-cited-mile-met.trycloudflare.com/. The tested replacement restaurant build points at that demo.
- The arcade game's previous preview host has expired and the local game service is not listening. An explicit staging-only `NEXT_PUBLIC_ARCADE_OFFLINE=true` build setting removes its dead play link and leaves the arcade information/prize plans available until the game service can be restored. Production defaults are unchanged. The previous command-tool launch rejection was `blocked by policy`; the specific rule was not disclosed. Arcade play, table rooms and scoring could not be checked in this audit.
- All nine restaurant routes and 50 internal fragments were checked; the delivery link worked in a normal browser. Taco picker, dish dialog, Escape/focus return and Agave dialog keyboard behaviour were exercised. The previous public build is noindex. Physical-device testing and customer or staff validation of current menu/offer details remain outstanding.

## Verification and cutover

The replacement restaurant build was prepared in an isolated directory to keep the user's running preview intact. Its production build and 40 tests passed, including all bottle asset hashes, region-search regressions and the staging-only offline arcade state. TypeScript and scoped ESLint passed. The replacement build has not yet been verified through the public URL: the user must restart the existing local restaurant server to point at the tested build, after which public and mobile browser checks can be repeated.

The Rezzo demo has been switched to an isolated corrected build whose restaurant/menu return links target the current restaurant preview. Its focused link, demo-isolation and notification tests passed (34 tests); its 68 packaged public/static assets match their sources. The public demo returned HTTP 200 with its sample-only notice, and the browser successfully selected a time and returned to date selection. No reservation was submitted. This local build depends on a junction to the original Rezzo dependencies and is not a portable standalone deployment.

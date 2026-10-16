# La Chingada brand system

The identity leads with the restaurant's real craft: Mexican corn, made into masa and tortillas here, every day. The follow-up design brings more of the energy of a taquería into the page through chile red, marigold, deep teal, bold signs and generous real food photography. The corn mark and single-colour wordmark keep the identity recognisable across these brighter surfaces.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| White | `#ffffff` | Menu-card interiors; reversed site lettering |
| Warm white | `#fffaf0` | Exported icon and wordmark lettering only; no page or panel backgrounds |
| Ink | `#25231e` | Body text; primary wordmark |
| Chile | `#bd3026` | Specials and editorial panels; main actions; favicon |
| Marigold | `#ffbd18` | Hero, menu and editorial page backgrounds; energetic accents |
| Teal | `#006d70` | Venue section; secondary sign and card surfaces |

The wordmark always uses one colour. Use ink on warm white or marigold, warm white on ink/chile/teal, or chile on warm white. The corn symbol carries the same colour as its accompanying wordmark. Avoid dividing a headline or wordmark into two accent colours.

Text contrast is 5.58:1 for warm white on chile, 5.90:1 for warm white on teal, 9.38:1 for ink on marigold, and 15.09:1 for ink on warm white. Chile on marigold is 3.47:1: reserve that pairing for large display text or non-text decoration, and use ink for small labels and paragraphs. Colour is paired with words, photography and layout rather than being the only way to communicate state.

## Typography

- **Barlow Condensed**, weights 700 and 800, for the website wordmark and display headings. Its narrow forms create the direct, confident feel of taquería signage. Weight 600 is retained as an asset and used in the social-card caption.
- **DM Sans**, variable weight range 100–1000, for descriptions, navigation, menu details and functional UI. Use 400 for paragraphs and 500–700 for small labels and controls.
- Both families are self-hosted as WOFF2 files in `public/fonts`. No runtime Google Fonts request is required. All four font binaries total 104,148 bytes; the three active CSS font resources total 81,840 bytes.
- Use `font-display: swap` and explicit weight declarations. The Latin subset includes Spanish accents used by the menu.

The original [Barlow Condensed](https://github.com/google/fonts/tree/main/ofl/barlowcondensed) and [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans) are distributed under the SIL Open Font License. Copies are included in `public/fonts/OFL-Barlow-Condensed.txt` and `public/fonts/OFL-DM-Sans.txt`.

## Mark and wordmark

`app/components/Brand.tsx` exports `Brand` and `CornMark`. The mark is an original geometric line drawing of an ear of corn with two husk leaves. Live brand lettering keeps the restaurant name readable to assistive technology. The adjacent icon is decorative and hidden from screen readers.

Standalone wordmarks in `public/brand/la-chingada-{ink,cream,chile}.svg` contain outlined Barlow and DM Sans glyphs, so they render consistently without installing fonts. The `cream` filename is retained for compatibility; its current colour is warm white `#fffaf0`. `public/brand/la-chingada-logo.png` is the ink variant rasterized at 900 pixels wide for services requiring PNG.

The matching SVG favicon and 48, 180 and 512 pixel PNG icons use chile with a warm-white corn mark. The web manifest uses the same chile theme and warm-white background. A 1200×630 social image in `public/brand/social-card.jpg` pairs the existing taco photograph with the warm-white wordmark, chile footer and marigold rule. Its caption also uses outlined Barlow Condensed glyphs, so the exported image does not depend on installed system fonts.

Keep clear space around the primary wordmark equal to at least one quarter of its mark height. Keep the primary wordmark unrotated and preserve its aspect ratio. The homepage uses a slight rotation on one secondary corn stamp; primary navigation, footer and app icons stay upright. Avoid placing the mark over busy food photography without a solid background. Decorative use remains sparse.

`public/brand/taqueria-tile.svg` is a small, code-native geometric tile using teal, chile and marigold. It can give an empty photo slot or section edge some texture; keep it subordinate to food photography and readable copy. It is decorative artwork, not a photograph of the restaurant.

## Photography and delivery

Nine existing photographic food and venue assets were inspected and converted into sixteen WebP derivatives at quality 84 with Sharp. Photo derivatives retain their original aspect ratios, receive no colour treatment and never upscale the source. `reports/brand-photo-assets.json` lists every file, dimension and byte count. The set of largest derivatives totals 869,332 bytes against 5,738,959 bytes in the original files, a reduction of 84.9%.

- Tacos: 640, 960 and 1280 pixels wide.
- Street corn: 640, 960, 1440 and 2048 pixels wide.
- Margarita and patio: 640, 960 and 1023 pixels wide.
- Square food images: native 600 pixels wide.
- Bar interior: native 591 pixels wide.

The six `corn-journey` illustrations, the mascot cutouts and the old background pattern remain archived in the source directory and do not form part of this identity. Food and venue imagery comes from existing restaurant assets and verified official restaurant sources; no restaurant food photographs are generated. The original optimisation register above covers the first set of repository photos. Additional sourced photographs are documented separately in `reports/NEW-PHOTOS.md` when available.

Use `srcSet`/`sizes` for responsive delivery, with explicit `width`/`height` to reserve image space. Eagerly load only the principal hero image; load below-the-fold images lazily.

## Missing-photo slots

Where the design calls for a photograph and a verified matching image is unavailable, show a visible outlined camera icon and an explicit `PHOTO NEEDED` label with the shot required, such as the dish name, patio overview or brunch plate. Treat these slots as intentional content placeholders for the owner to fill. They should retain the intended image aspect ratio and use the same colour and tile system as the surrounding cards.

Use photographs only for subjects they actually show. A general taco or cocktail photo can support a general food or drink feature, but it should not stand in for a named dish or cocktail whose identity has not been confirmed. A caption must not imply a photograph exists when the slot is still empty. Keep planned brunch clearly marked as coming soon.

## Verification

Inspected the exported wordmark, corn favicon, social card and full-size taco derivative visually. Font metadata confirms the DM Sans weight axis spans 100–1000. All SVG wordmarks are UTF-8 and use paths for all lettering. The Brand component passes ESLint.

Reviewed the final homepage source and stylesheet: the same `Brand` component appears in navigation and footer, `CornMark` repeats in the tortilla story and reservation strip, and all principal homepage images use optimized repository photography. The hero has explicit dimensions, responsive sources and high fetch priority. Story, margarita and bar images load lazily. The editorial page shell shares the same identity, fonts and photo derivatives.

Local HTTP checks confirmed 200 responses with correct content types for the three active font files, SVG favicon, social card and responsive taco image. This is an asset/source check; rendered website layout review is handled separately.

The brighter-palette follow-up regenerated the outlined chile/warm-white wordmarks, SVG favicon and three PNG sizes, manifest colours, and social card from the same original taco photograph. The social card was visually inspected at its native 1200×630 size; the mark, single-colour lettering and caption remain legible and uncut. All exported brand SVGs were checked for the retired colour values, and the new text/background pairings were checked using WCAG relative luminance.

## Bottle-photo identity audit

An additional audit inspected all 63 inherited agave bottle images. Filename-to-photo identities were systematically mismatched. Corrected 49 existing archive image mappings, omitted 4 unsupported photographs and attached 4 verified photos to previously unpictured records. See `reports/PHOTO-AUDIT.md` and `reports/agave-photo-audit.json` for the complete evidence register and limits.

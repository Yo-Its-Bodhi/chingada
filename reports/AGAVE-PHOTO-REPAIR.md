# Agave photo repair pass

Updated 17 October 2026. 21 previously empty public cards now have verified photographs. The public library has 165 photos across 165 bottles; 0 named placeholders remain. None of the existing 144 photos was broken or missing.

The source photographs were checked against the exact expression. Native transparent producer/importer photos were used where available. Opaque source photographs were edited with the built-in ImageGen background-extraction tool; bottle identity, labels, colours and complete silhouettes were retained, without gift boxes, background panels or cast shadows. Per-image source URLs, raw/derived archive paths, extraction prompts, dimensions and visual/alpha checks are retained in the research JSON batches. The optimized public WebPs are in `public/images/agave-researched/`; raw originals stay outside the public package.

All 165 approved delivery files total 13,732,994 bytes (13.73 MB). House infusions remain unpublished.

## Recovered photographs

| ID | Bottle | Source / identity reference |
| --- | --- | --- |
| 12 | DON ADRIANO REPOSADO | [Photograph source](https://www.lcbo.com/en/don-adriano-1950-reposado-38523) |
| 20 | GRAN COFRADIA REPOSADO | [Photograph source](https://woodmanwinesandspirits.com/products/gran-cofradia-reposado-ceramic-gift-pack) |
| 21 | GRAN CORONEL REPOSADO | [Photograph source](https://www.dosartesbrands.com/brands/gran-coronel) |
| 49 | GRAN MAYAN ULTRA EXTRA AÑEJO | [Photograph source](https://www.liquormarts.ca/product/grand-mayan-ultra-aged-tequila/750-ml) |
| 60 | AGUA SANTA JOVEN MEZCAL | [Photograph source](https://www.bswliquor.com/products/mezcal-agua-santa-espadin) |
| 62 | AMARÁS LOGIA CENIZO MEZCAL | [Photograph source](https://shingroupcorp.com/products/amaras-mezcal-logia-cenizo/) |
| 67 | BANHEZ ESPADIN & BARRIL MEZCAL | [Photograph source](https://www.cnibrands.com/banhez-mezcal-artesanal) |
| 69 | CASAMIGOS MEZCAL | [Photograph source](https://www.casamigos.com/en-us/our-tequilas/mezcal) |
| 70 | CLASE AZUL MEZCAL DURANGO | [Photograph source](https://www.grandcruwijnen.nl/amfile/file/download/file/zLWNJplXpJqteJjg2x8YJJuV0gVDYs6Z/product/11526/) |
| 73 | DEL MAGUEY VIDA PUEBLA | [Photograph source](https://delmaguey.com/vida-puebla/) |
| 75 | EL SILENCIO MEZCAL | [Photograph source](https://shop.silencio.com/products/espadin) |
| 76 | ILEGAL REPOSADO MEZCAL | [Photograph source](https://shop.ilegalmezcal.com/products/reposado-750) |
| 77 | LEYENDA 'TLACUACHE' MEZCAL | [Photograph source](https://www.lcbo.com/en/leyenda-tlacuache-organic-mezcal-275420) |
| 78 | LOS SIETE MISTERIOS DOBA-YEJ | [Photograph source](https://www.chathamimports.com/brands/los-siete-misterios/) |
| 84 | LA SERPIENTE EMPLUMADA TOBALÁ JOVEN | [Photograph source](https://www.saq.com/en/15082192) |
| 99 | CHAMELEON BLANCO | [Photograph source](https://www.lcbo.com/en/chameleon-tequila-blanco-26421) |
| 103 | COBALTO BLANCO | [Photograph source](https://www.lcbo.com/content/dam/lcbo/PDFs/vintages/releases/2021/210612_en.pdf) |
| 108 | ELEVACION 1250 BLANCO | [Photograph source](https://www.lcbo.com/en/elevacion-1250-tequila-31949) |
| 127 | XICOTE BLANCO | [Photograph source](https://www.delmesaliquor.com/products/xicote-blanco-tequila) |
| 136 | DON ADRIANO 1950 AÑEJO | [Photograph source](https://www.lcbo.com/en/don-adriano-1950-anejo-ultra-premium-tequila-33777) |
| 181 | LOS SIETE MISTERIOS ESPADÍN / CUISHE ENSAMBLE | [Photograph source](https://www.sietemisterios.com/en/) |

## Remaining label checks

None remain for the public collection. The user supplied the previously ambiguous bottles, and producer labels established their exact expressions. Every public card now has a photograph. The 26 house infusions remain unpublished and still need genuine restaurant photographs.

## Identity corrections

The owner’s POS and inventory supplied Doba-Yej for record 78. Its native importer photo and current producer/importer facts replace the generic old entry in the interface. A display-data guard prevents the former 45% clay-distilled Siete Misterios notes from appearing on the 44% copper-distilled Doba-Yej record. Historical IDs and source names remain preserved.

The Cenizo spelling and Amarás Logia display name follow the photographed label. Agua Santa’s photographed Canadian label supplies 42% ABV and Espadín; older house tasting notes remain available elsewhere in the record.

The owner-confirmed bottles are Clase Azul Mezcal Durango, Del Maguey Vida Puebla, La Serpiente Emplumada Tobalá Joven and Los Siete Misterios Espadín/Cuishe Ensamble. The first two use owner-supplied photographs edited for transparency; their metadata identifies an owner upload without falsely claiming an Internet image origin. Tobalá and Ensamble use matching native transparent SAQ/producer photographs. Exact venue batch alcohol strength remains omitted for those two because published market/batch labels vary. Conflicting old Espadín/Papalote notes do not appear on the corrected expressions.

## Verification and preview status

The final production package passed 38 tests, including decoding, real alpha, dimensions and identical packaged/source hashes for every one of the 165 approved photos. TypeScript, scoped ESLint and the credential-source check passed. Raw sources, generated intermediates and extraction prompts are retained in ignored work archives and the research metadata. No house infusions became public.

The restaurant preview currently returns HTTP 502. Automatic approval review rejected restarting it after the rebuild with “blocked by policy.” No alternate launch method was attempted. The new build has not been verified in a public browser; earlier screenshots/public checks apply to the previous build. Run the normal foreground preview command documented in README.md to resume the existing restaurant tunnel, then verify the public collection. Business domains and live Rezzo were not changed.

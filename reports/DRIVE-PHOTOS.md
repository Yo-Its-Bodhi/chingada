# Owner-provided food photography — October 14, 2026

The owner shared the [public restaurant photo library](https://drive.google.com/drive/folders/1RpDcjtnv1z_0IgnNRFEF0l5mBXk-MSkF). Twenty-seven food and drink photographs were opened and downloaded through the visible Drive UI in two batches, then inspected locally. The files retain their observed source filenames, available Drive IDs, source folder URLs and proposed menu matches in [menu-photo-manifest.json](menu-photo-manifest.json). The [contact sheet](drive-food-contact-sheet.jpg) shows all 27 inspected food and drink photographs. The first batch exposes individual Drive IDs; the direct downloads in the second batch expose filenames and their source folder, so their individual IDs are recorded as null.

The first two food batches produced 17 square menu photos at 600 × 600 WebP, with original framing and colour preserved, no upscaling, and compression quality 86. Their combined size is about 953 KB. Sixteen match named current dishes; the signature margarita is a generic bar photograph with no exact recipe assigned. The later taco batch adds three landscape menu photographs, documented below.

| Source filename | Matching current menu item | Asset |
| --- | --- | --- |
| `CHINGADA TACO.png` | Chingada Taco | `/images/menu/chingada-taco-600.webp` |
| `CHORIZO TACO.png` | Chorizo Taco | `/images/menu/chorizo-taco-600.webp` |
| `BURRITO.png` | Burrito | `/images/menu/burrito-600.webp` |
| `CARNITAS TACO.png` | Carnitas Taco | `/images/menu/carnitas-taco-600.webp` |
| `CHIPS AND SALSA.png` | Chips & Salsa | `/images/menu/chips-salsa-600.webp` |
| `GUACAMOLE BOWL.png` | Guacamole Bowl | `/images/menu/guacamole-bowl-600.webp` |
| `MUSHROOM.png` | Mushroom Taco | `/images/menu/mushroom-taco-600.webp` |
| `NACHOS.png` | Nachos | `/images/menu/nachos-600.webp` |
| `POTATOES.png` | Mexican Potatoes | `/images/menu/mexican-potatoes-600.webp` |
| `QUESO FUNDIDO.png` | Queso Fundido | `/images/menu/queso-fundido-600.webp` |
| `SWEET POT.png` | Sweet Potato Taco | `/images/menu/sweet-potato-taco-600.webp` |
| `Taco Bowl.png` | Taco Bowl | `/images/menu/taco-bowl-600.webp` |
| `Mole 2.png` | Mole con Pollo | `/images/menu/mole-con-pollo-600.webp` |
| `Michelada.png` | Michelada | `/images/menu/michelada-600.webp` |
| `TINGA.png` | Tinga de Pollo Taco | `/images/menu/tinga-de-pollo-taco-600.webp` |
| `TRES LECHE.png` | Tres Leches Cake | `/images/menu/tres-leches-cake-600.webp` |
| `Signature Marg.png` | Generic signature margarita; variation unconfirmed | `/images/menu/signature-margarita-600.webp` |
| `BARBACOA TACO.png` | Barbacoa Taco | Reuse `/images/optimized/barbacoa-taco-600.webp` |

The chips-and-salsa photograph shows chips with three bowls: guacamole, chunky salsa, and a thinner salsa, matching the three-dip serving described by the current menu. The named Carnitas source is a different close-up from the existing Happy Hour photo and is exported as an alternate.

`CHURROS.png` shows short curved miniature churros rather than long sticks, but they are not visibly cut into bite pieces. It is recorded as a proposed Churro Bites match requiring confirmation of the current serving style; it is not assigned automatically.

`BEANS.png`, `BEET SALAD.png`, `CHILI.png`, `CHIPS.png`, and `CHORIQUESO.png` do not have direct entries in the current menu. The lowercase `burrito.png` is an alternate wide version of the square burrito photograph. The two unnamed `DSC_` photographs show an unidentified taco and a meat/tortilla platter; neither is assigned to a specific current menu item. These images should not replace unrelated dishes merely to fill a photo slot.

The two genuine kitchen photographs come from the owner's [Tortillas + Masa library](https://drive.google.com/drive/folders/1Xd30njUpTcjPrZBQ0JTWl0nkz9yu57Xe). Both were visually checked: `DSC_0155.jpg` shows a stack of fresh corn tortillas; `DSC_0167.jpg` shows multiple corn tortillas cooking across a griddle. Their filenames, source folder, native dimensions, alt text and responsive variants are recorded in the same manifest. Individual Drive IDs were not exposed by these direct downloads. The [craft contact sheet](drive-craft-contact-sheet.jpg) shows both originals.

| Source filename | Native size | Exported assets |
| --- | --- | --- |
| `DSC_0155.jpg` | 1330 × 884 | `/images/craft/tortilla-stack-640.webp` (640 × 425), `/images/craft/tortilla-stack-960.webp` (960 × 638) |
| `DSC_0167.jpg` | 1457 × 884 | `/images/craft/tortillas-on-griddle-640.webp` (640 × 388), `/images/craft/tortillas-on-griddle-960.webp` (960 × 582), `/images/craft/tortillas-on-griddle-1440.webp` (1440 × 874) |

The five craft variants total about 127 KB. The shared browser download bundle and the original files in the owner's Downloads directory are preserved. Additional batches can be processed through `reports/drive-photo-tools.py` after observations are added to `work/drive-food-observations.json`, `work/drive-food-direct.json` or `work/drive-craft-photos.json`.

One additional [portrait, `20241028_165807.jpg`](https://drive.google.com/file/d/19XOoeo4RAxmlJ-4vXQitrkOsXi01YjeJ/view), was supplied from the owner's [Winter24 Drive folder](https://drive.google.com/drive/folders/1_pkp3MIiKbU2pd8QLJlPKh8u_JzgdJtf). The visible grilled shrimp, creamy slaw, jalapeño slices, pink pickled onions and orange mayonnaise support an inferred match to the current Shrimp Taco. The timestamp filename itself does not identify the dish. This distinction is explicit in the manifest, together with the individual Drive ID and source folder URL.

The full original was downloaded as `20241028_165807 (1).jpg` and measures 1848 × 4000 pixels. The taco occupies the middle of a tall frame, with a dark background above and a wooden table below. The original framing is preserved in three variants, without upscaling: `/images/food/shrimp-taco-640.webp` (640 × 1385, about 124 KB), `/images/food/shrimp-taco-960.webp` (960 × 2078, about 222 KB), and `/images/food/shrimp-taco-1440.webp` (1440 × 3117, about 410 KB).

Three more full originals from the same Winter24 folder were inspected locally. Each is 1848 × 4000 pixels after applying camera orientation. Their timestamp filenames provide no dish names, so the manifest records the following matches as ingredient-based inferences. The bowl is recorded as a probable match because the exact marinade is not identifiable visually. The [Winter24 contact sheet](drive-winter-contact-sheet.jpg) shows the shrimp taco and all three additional photographs.

| Source filename | Proposed menu match and visible evidence | Exported assets |
| --- | --- | --- |
| `20241028_170654.jpg` | Blackened Fish Taco: seared fish fillet, creamy slaw and pale green sauce on a black tortilla | `/images/food/blackened-fish-taco-640.webp`, `/images/food/blackened-fish-taco-960.webp` |
| `20241028_170834.jpg` | Baja Fish Taco: battered fish, fruit/slaw, pink pickled onions and orange mayonnaise on a black tortilla | `/images/food/baja-fish-taco-640.webp`, `/images/food/baja-fish-taco-960.webp` |
| `20241028_171054.jpg` | Aguachile, probable: shrimp, avocado, red/pink onions and dark marinade in a bowl served with tostadas | `/images/food/aguachile-640.webp`, `/images/food/aguachile-960.webp` |

For all three photographs, the 640 variant is 640 × 1385 and the 960 variant is 960 × 2078. Original framing is preserved and no upscaling is applied. The original Downloads files are retained. Their source folder URL is recorded; individual Drive IDs were not included in the supplied observation records.

The final taco sources come from a separate [owner-provided Drive folder](https://drive.google.com/drive/folders/1aUozslFAaUa78neg5JteRG6Y9fRtdzGQ). Source filenames and visible ingredients support the three menu matches below. Each export preserves the original landscape frame at 640 × 426, without upscaling or artistic changes. The [final taco contact sheet](drive-final-tacos-contact-sheet.jpg) includes all four inspected source photographs.

| Source filename | Native dimensions | Proposed menu match | Exported asset |
| --- | --- | --- | --- |
| `Carne.jpg` | 6016 × 4000 | Carne Asada Taco; visible seared steak, onion and cilantro | `/images/menu/carne-asada-taco-640.webp` |
| `KFC.png` | 2000 × 1330 | Fried Chicken Taco; visible fried chicken, lettuce, pico and orange mayonnaise | `/images/menu/fried-chicken-taco-640.webp` |
| `Pastor.jpg` | 2250 × 1496 | Pastor Taco; visible pork, pineapple and green salsa | `/images/menu/pastor-taco-640.webp` |
| `Vegetarian.jpg` | 2250 × 1496 | Unassigned older vegetarian recipe; mushrooms and corn are visible, rather than halloumi | No export or Halloumi mapping |

The three added taco WebPs total about 143 KB. All four original Downloads files are preserved. Their source folder URL is recorded; individual Drive IDs were not included in the supplied observation records.

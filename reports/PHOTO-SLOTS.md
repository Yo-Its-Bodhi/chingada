# Photo slots and replacement guide

The local redesign uses actual owner-provided food photographs and genuine restaurant photos. A camera icon with **PHOTO NEEDED** names every intended photo that has no confirmed match. No unrelated dish photograph is substituted.

## Remaining named shots

### Tacos

- Halloumi Taco

### Appetizers

- Barbacoa Sliders
- Quesadilla
- Aguachile
- Tacos Dorados
- Rollitos de Birria

### Meals

- Quesabirria
- Chicken Enchiladas
- Empanadas
- Carne Asada Meal
- Fajitas

### Desserts

- Churro Bites
- Diablito

### Brunch — planned menu, not serving yet

- Huevos Rancheros
- Breakfast Tacos
- Mexican Toast
- French Toast
- Fruit Salad

The weekly Brunch card also has a named camera slot: **The brunch spread**. The other five weekly cards have genuine photographs. Restaurant and patio images are already installed.

## Add or replace a photo

1. Put the optimized WebP file in `public/images/menu/` (or `public/images/food/` for responsive derivatives). Keep the original elsewhere.
2. In `app/menu-data.ts`, find the named item and add or replace its `image` property, using a public path such as `/images/menu/halloumi-taco-640.webp`. Add `imageWidth` and `imageHeight` for its native dimensions.
3. The menu card and detail dialog automatically replace the camera slot. Nothing else needs to be removed.
4. For the weekly Brunch spread, set that entry’s `image` and accurate `alt` in the `specials` list at the top of `app/page.tsx`. Keep its coming-soon wording until brunch launches.

Portrait food photos are cropped by CSS inside uniform cards; the source file keeps its original frame and colour. Dish photography belongs to the exact item. Margaritas and cocktails use a real category photo with a compact menu; beer, wine and non-alcoholic lists do not reserve individual photo slots.

The homepage initially shows six food cards; “See all” reveals the complete category. Search and dietary filters show every matching result. The full menu remains available at `/menu` without JavaScript.

## Installed menu photos (24)

| Menu item | Public asset |
| --- | --- |
| Chips & Salsa | `/images/menu/chips-salsa-600.webp` |
| Guacamole Bowl | `/images/menu/guacamole-bowl-600.webp` |
| Mexican Street Corn | `/images/optimized/street-corn-hero-640.webp` |
| Nachos | `/images/menu/nachos-600.webp` |
| Mexican Potatoes | `/images/menu/mexican-potatoes-600.webp` |
| Queso Fundido | `/images/menu/queso-fundido-600.webp` |
| Barbacoa Taco | `/images/optimized/barbacoa-taco-600.webp` |
| Baja Fish Taco | `/images/food/baja-fish-taco-640.webp` |
| Blackened Fish Taco | `/images/food/blackened-fish-taco-640.webp` |
| Carne Asada Taco | `/images/menu/carne-asada-taco-640.webp` |
| Carnitas Taco | `/images/menu/carnitas-taco-600.webp` |
| Chingada Taco | `/images/menu/chingada-taco-600.webp` |
| Chorizo Taco | `/images/menu/chorizo-taco-600.webp` |
| Fried Chicken Taco | `/images/menu/fried-chicken-taco-640.webp` |
| Mushroom Taco | `/images/menu/mushroom-taco-600.webp` |
| Pastor Taco | `/images/menu/pastor-taco-640.webp` |
| Shrimp Taco | `/images/food/shrimp-taco-640.webp` |
| Sweet Potato Taco | `/images/menu/sweet-potato-taco-600.webp` |
| Tinga de Pollo Taco | `/images/menu/tinga-de-pollo-taco-600.webp` |
| Burrito | `/images/menu/burrito-600.webp` |
| Taco Bowl | `/images/menu/taco-bowl-600.webp` |
| Mole con Pollo | `/images/menu/mole-con-pollo-600.webp` |
| Tres Leches Cake | `/images/menu/tres-leches-cake-600.webp` |
| Michelada | `/images/menu/michelada-600.webp` |

Provenance and source identities are in `DRIVE-PHOTOS.md`, `menu-photo-manifest.json`, `NEW-PHOTOS.md` and `new-photo-manifest.json`. Historical recipe photos and uncertain matches are documented separately.

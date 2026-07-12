import type { AgaveRecord } from "./agave-data";

const names: Array<[string, "Tequila" | "Mezcal"]> = [
  ["APPLE TEQUILA","Tequila"],["BANANA TEQUILA","Tequila"],["BLUEBERRY TEQUILA","Tequila"],
  ["BLUE-RASPBERRY TEQUILA","Tequila"],["CINNAMON TEQUILA","Tequila"],["COCONUT TEQUILA","Tequila"],
  ["GRAPEFRUIT TEQUILA","Tequila"],["HABANERO TEQUILA — SPICY","Tequila"],["HIBISCUS TEQUILA","Tequila"],
  ["JALAPEÑO TEQUILA — SPICY","Tequila"],["LA PINTA POMEGRANATE TEQUILA","Tequila"],["LAVENDER TEQUILA","Tequila"],
  ["LEMON TEQUILA","Tequila"],["LIME TEQUILA","Tequila"],["MINT TEQUILA","Tequila"],
  ["MIXED-BERRY TEQUILA","Tequila"],["ORANGE TEQUILA","Tequila"],["PEACH TEQUILA","Tequila"],
  ["PINEAPPLE TEQUILA","Tequila"],["RASPBERRY TEQUILA","Tequila"],["SKITTLE TEQUILA","Tequila"],
  ["SOUR SKITTLE TEQUILA","Tequila"],["STRAWBERRY TEQUILA","Tequila"],["TAMARIND TEQUILA","Tequila"],
  ["HABANERO MEZCAL — SPICY","Mezcal"],["ORANGE MEZCAL","Mezcal"],["MINT MEZCAL","Mezcal"],
];

export const houseInfusions: AgaveRecord[] = names.map(([name,type],index)=>({
  id: 152 + index,
  name,
  category:"House Infused",
  type,
  note:"Prepared in-house at La Chingada. Infusion times vary from 48 hours to two weeks; ask the team about current availability.",
}));

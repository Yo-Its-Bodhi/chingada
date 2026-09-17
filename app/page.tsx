"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { agaveRecords, type AgaveRecord } from "./agave-data";
import { archiveDetails } from "./agave-archive";
import { catalogDetails } from "./agave-catalog";
import { houseInfusions } from "./house-infusions";

type Dish = { name: string; price: string; desc: string; tags?: string[]; spicy?: boolean | number; group: string; image?: string; feature?: string };

const dishes: Dish[] = [
  {group:"Appetizers",name:"Chips & Salsa",price:"$14",tags:["V","VG"],desc:"Corn chips with guacamole, chunky salsa, and salsa borracha."},
  {group:"Appetizers",name:"Guacamole Bowl",price:"$15",tags:["V","VG"],desc:"Corn chips with avocado, onion, jalapeño, tomato, lime, and cilantro."},
  {group:"Appetizers",name:"Barbacoa Sliders",price:"$15",desc:"Two toasted sliders with barbacoa, cheese, Valentina mayo, red onion, and cilantro."},
  {group:"Appetizers",name:"Quesadilla",price:"$15",tags:["V"],desc:'12" flour tortilla filled with cheese and grilled crispy. Add a filling +$6.'},
  {group:"Appetizers",name:"Mexican Street Corn",price:"$11",tags:["GF","V"],desc:"Roasted corn with cilantro mayo, queso fresco, Tajín, and cilantro."},
  {group:"Appetizers",name:"Nachos",price:"$17",tags:["V"],desc:"Corn chips, beans, jalapeños, chilis, cheese sauce, scallions, crema, and cilantro. Add a topping +$6."},
  {group:"Appetizers",name:"Aguachile",price:"$23",spicy:true,desc:"Shrimp in a spicy lime-habanero marinade with cucumber and avocado. Served with tostadas."},
  {group:"Appetizers",name:"Tacos Dorados",price:"$16",desc:"Four rolled corn tortillas with braised beef, lettuce, salsa verde, salsa roja, crema, and queso fresco."},
  {group:"Appetizers",name:"Rollitos de Birria",price:"$16",desc:"Corn tortilla layered with braised beef, cheese, onions, and cilantro; grilled and served with birria jus."},
  {group:"Appetizers",name:"Mexican Potatoes",price:"$15",desc:"Cajun potatoes with chorizo, queso fresco, chilis, scallions, crema, and cilantro."},
  {group:"Appetizers",name:"Queso Fundido",price:"$14",tags:["V"],desc:"House cheese sauce served hot in a skillet with corn chips. Add chorizo +$4."},
  {group:"Tacos",name:"Barbacoa Taco",price:"$8",tags:["GF"],desc:"Braised beef, caramelized onions, white onions, and salsa roja.",image:"/images/barbacoa-taco.png",feature:"CHINGADITO SAYS: START HERE"},
  {group:"Tacos",name:"Baja Fish Taco",price:"$8",desc:"Beer-battered basa, mango-pineapple slaw, pickled onions, and Valentina mayo."},
  {group:"Tacos",name:"Blackened Fish Taco",price:"$8",tags:["GF"],desc:"Cajun-grilled basa, creamy slaw, and avocado salsa."},
  {group:"Tacos",name:"Carne Asada Taco",price:"$8",desc:"Marinated steak, potato sticks, and salsa borracha."},
  {group:"Tacos",name:"Carnitas Taco",price:"$8",tags:["GF"],desc:"Braised pork, refried beans, pico de gallo, and salsa verde."},
  {group:"Tacos",name:"Chingada Taco",price:"$9",desc:"Melted cheese, carne asada, chorizo, potato sticks, salsa verde, and salsa chingada."},
  {group:"Tacos",name:"Chorizo Taco",price:"$8",tags:["GF"],desc:"Marinated ground pork, chicharrón, and salsa verde."},
  {group:"Tacos",name:"Halloumi Taco",price:"$8",tags:["V"],desc:"Grilled halloumi, lettuce, pickled relish, chilis, scallions, potato sticks, and hot honey."},
  {group:"Tacos",name:"Fried Chicken Taco",price:"$8",desc:"Buttermilk fried chicken, lettuce, pico de gallo, chilis, and Valentina mayo."},
  {group:"Tacos",name:"Mushroom Taco",price:"$8",tags:["GF","V"],desc:"Grilled mushrooms, melted cheese, potato sticks, onions, and salsa roja."},
  {group:"Tacos",name:"Pastor Taco",price:"$8",tags:["GF"],desc:"Marinated pork, grilled pineapple, and salsa verde."},
  {group:"Tacos",name:"Shrimp Taco",price:"$9",tags:["GF"],desc:"Grilled shrimp, creamy slaw, jalapeños, pickled onions, and Valentina mayo."},
  {group:"Tacos",name:"Sweet Potato Taco",price:"$7.50",tags:["V","VG"],desc:"Grilled sweet potato, avocado, refried beans, pickled onions, and avocado salsa."},
  {group:"Tacos",name:"Tinga de Pollo Taco",price:"$8",tags:["GF"],desc:"Marinated chicken, queso fresco, salsa roja, and crema fresca."},
  {group:"Meals",name:"Quesabirria",price:"$21",desc:"Jus-dipped flour tortilla with cheese and braised beef, grilled crispy with onions, cilantro, and jus."},
  {group:"Meals",name:"Burrito",price:"$16",tags:["V","VG"],desc:"Rice, beans, onions, guacamole, pico, lettuce, and avocado salsa. Add a filling +$6."},
  {group:"Meals",name:"Taco Bowl",price:"$17",tags:["V","VG"],desc:"Rice, beans, guacamole, pico, lettuce, pickled onions, avocado salsa, and tostadas. Add a topping +$6."},
  {group:"Meals",name:"Chicken Enchiladas",price:"$22",tags:["GF"],desc:"Four corn tortillas with tinga de pollo, salsa verde, crema fresca, and queso fresco."},
  {group:"Meals",name:"Empanadas",price:"$17",desc:"Choose two: cheese, chorizo & cheese, or chicken & cheese. Served with all the fixings."},
  {group:"Meals",name:"Carne Asada Meal",price:"$22",tags:["GF"],desc:"Grilled steak with esquites, rice, beans, jalapeño, salsa borracha, and corn tortillas."},
  {group:"Meals",name:"Mole con Pollo",price:"$22",desc:"Grilled chicken thigh with mole sauce, rice, and beans. CONTAINS NUTS."},
  {group:"Meals",name:"Fajitas",price:"$22",desc:"Chicken, steak, shrimp, or veggie with peppers, onions, jalapeños, and tortillas. GF and V/VG options available."},
  {group:"Desserts",name:"Churro Bites",price:"$10",tags:["V"],desc:"Bite-sized churros tossed in cinnamon sugar."},
  {group:"Desserts",name:"Tres Leches Cake",price:"$10",tags:["V"],desc:"Vanilla sponge cake soaked in our three-milk sauce."},
  {group:"Desserts",name:"Diablito",price:"$8",tags:["GF","V","VG"],desc:"Mango sorbet, chamoy, Tajín, and candied mango."},
  {group:"Margaritas",name:"Classic Margarita",price:"$15",desc:"Blanco tequila, triple sec, lime juice, and agave."},
  {group:"Margaritas",name:"Mezcalita",price:"$16",desc:"Mezcal, triple sec, lime juice, and agave."},
  {group:"Margaritas",name:"Lavender & Violette",price:"$15",desc:"Lavender tequila, violette liqueur, lemon juice, hibiscus, and simple syrup."},
  {group:"Margaritas",name:"Habanero Margarita",price:"$15",spicy:3,desc:"Habanero tequila, triple sec, lime juice, and agave."},
  {group:"Margaritas",name:"Mad Mango",price:"$16",spicy:2,desc:"Habanero tequila, triple sec, mango, lemon juice, and simple syrup."},
  {group:"Margaritas",name:"Dirty Margarita",price:"$15",spicy:1,desc:"Blanco tequila, triple sec, lime juice, agave, pickled jalapeño juice, and jalapeños."},
  {group:"Margaritas",name:"Guava Margarita",price:"$16",desc:"Raspberry tequila, pomegranate liqueur, guava, lemon juice, and simple syrup."},
  {group:"Margaritas",name:"Tamarind & Ginger",price:"$16",desc:"Tamarind tequila, ginger liqueur, ginger, lemon juice, and agave."},
  {group:"Margaritas",name:"A Night in Oaxaca",price:"$16",desc:"Mezcal, triple sec, lime juice, and hibiscus."},
  {group:"Margaritas",name:"Pineapple Paradise",price:"$16",desc:"Pineapple tequila, triple sec, lemon juice, pineapple, and simple syrup."},
  {group:"Margaritas",name:"Strawberry + Basil Margarita",price:"$16",desc:"Strawberry tequila, strawberry liqueur, basil, strawberry, lemon juice, and strawberry + basil syrup."},
  {group:"Cocktails",name:"Pepino Fresco",price:"$15",desc:"Pineapple tequila, guanabana, cucumber, lime, and simple syrup."},
  {group:"Cocktails",name:"Mezcal Mule",price:"$15",desc:"Mezcal, lime juice, ginger beer, and bitters."},
  {group:"Cocktails",name:"Paloma",price:"$16",desc:"Tequila, grapefruit juice, grapefruit bitters, lime juice, simple syrup, and soda water."},
  {group:"Cocktails",name:"Ranch Water",price:"$14",desc:"Tequila, triple sec, lime juice, and soda water."},
  {group:"Cocktails",name:"Chelada",price:"$12",desc:"Salt-rimmed glass with lime juice and beer."},
  {group:"Cocktails",name:"Michelada",price:"$14",spicy:true,desc:"Beer, Clamato, xXx sauce, Maggi, lime juice, and Tajín rim."},
  {group:"Cocktails",name:"Carajillo",price:"$14",desc:"Coffee tequila, butterscotch liqueur, espresso, and simple syrup."},
  {group:"Beer",name:"Corona",price:"$8",desc:"Mexican lager."},
  {group:"Beer",name:"Sol",price:"$8.50",desc:"Mexican lager."},
  {group:"Beer",name:"Modelo Especial",price:"$9",desc:"Mexican lager."},
  {group:"Beer",name:"Modelo Negra",price:"$9",desc:"Mexican amber lager."},
  {group:"Beer",name:"Dos Equis XX",price:"$9",desc:"Mexican lager."},
  {group:"Beer",name:"Tecate",price:"$9.50",desc:"Mexican lager."},
  {group:"Beer",name:"Corona Cero 0%",price:"$7",desc:"Non-alcoholic Mexican lager."},
  {group:"Beer",name:"Pecadito",price:"$8",desc:"Light craft lager."},
  {group:"Beer",name:"Life in the Clouds",price:"$9.50",desc:"Local NEIPA."},
  {group:"Beer",name:"Jam Up the Mash",price:"$9.50",desc:"Local dry-hopped sour."},
  {group:"Beer",name:"Belgian Blue Moon",price:"$10",desc:"Wheat beer."},
  {group:"Beer",name:"Belgian Mango Moon",price:"$10",desc:"Mango wheat beer."},
  {group:"Beer",name:"Woodhouse Nordic Pale Ale",price:"$9.50",desc:"Local pale ale."},
  {group:"Beer",name:"Woodhouse IPA",price:"$9.50",desc:"Local IPA."},
  {group:"Beer",name:"Brickworks",price:"$9.50",desc:"Local cider."},
  {group:"Wine",name:"Adobe Sauvignon Blanc",price:"$8 · $13 · $40",desc:"White wine · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Piedra Negra Pinot Grigio",price:"$9 · $14 · $45",desc:"White wine · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Santa Carolina Chardonnay",price:"$8 · $13 · $40",desc:"White wine · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Casillero del Diablo Cabernet Sauvignon",price:"$8 · $13 · $40",desc:"Red wine · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Argento Malbec",price:"$9 · $14 · $45",desc:"Red wine · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Campo Viejo Tempranillo",price:"$9 · $14 · $45",desc:"Red wine · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Adobe Rosé",price:"$8 · $13 · $40",desc:"Rosé · 5 oz, 8 oz, or bottle."},
  {group:"Wine",name:"Segura Viudas Cava",price:"$9 · $45",desc:"Cava · 5 oz or bottle."},
  {group:"Non-Alcoholic",name:"Mexican Sodas",price:"$4.50",desc:"Lime, mandarin, pineapple, tamarind, guava, grapefruit, Sangria Señorial, or Mexican Coke."},
  {group:"Non-Alcoholic",name:"Domestic Sodas",price:"$2.50",desc:"Coke, Diet Coke, Ginger Ale, Sprite, tonic, club soda, Fresca, or iced tea."},
  {group:"Non-Alcoholic",name:"Juice",price:"$3.50",desc:"Orange, grapefruit, or cranberry."},
  {group:"Non-Alcoholic",name:"Still Water",price:"SM $2 · LG $6",desc:"Still bottled water."},
  {group:"Non-Alcoholic",name:"Sparkling Water",price:"SM $3 · LG $7",desc:"Sparkling bottled water."},
  {group:"Non-Alcoholic",name:"Topo Chico",price:"$3.50",desc:"Mexican sparkling mineral water."},
  {group:"Non-Alcoholic",name:"Hot Chocolate",price:"$4.50",desc:"Classic or Mexican hot chocolate."},
  {group:"Non-Alcoholic",name:"Tea",price:"$4.50",desc:"Orange pekoe, green, chamomile, or peppermint."},
  {group:"Non-Alcoholic",name:"Coffee",price:"$4.50",desc:"Drip coffee or café de olla."},
  {group:"Non-Alcoholic",name:"Aguas Frescas",price:"$6",desc:"Strawberry, hibiscus, lemon, lime, horchata, pineapple, or mango. Spike it with tequila, vodka, gin, rum, or rye +$6."},
  {group:"Brunch",name:"Huevos Rancheros",price:"$18",tags:["GF","V"],desc:"Two fried eggs on handmade tortillas with black beans, avocado, queso fresco, ranchera sauce, and cilantro."},
  {group:"Brunch",name:"Breakfast Tacos",price:"$15",tags:["GF","V"],desc:"House-made corn tortillas, scrambled eggs, pico, guacamole, crema, avocado crema, and cilantro."},
  {group:"Brunch",name:"Mexican Toast",price:"$16",tags:["V"],desc:"Rye toast with avocado, corn salsa, queso fresco, red chilis, and cilantro."},
  {group:"Brunch",name:"French Toast",price:"$16",tags:["V"],desc:"Concha bread with whipped cream, strawberries, and icing sugar."},
  {group:"Brunch",name:"Fruit Salad",price:"$10",tags:["GF","V","VG"],desc:"Seasonal fruit salad."},
];

const specials = [
  ["MON", "Margarita Monday", "$10 margs · Monday is useful again"], ["TUE", "Taco Tuesday", "Any 3 tacos · $20 · choose by vibes"],
  ["WED", "Happy Hour All Day", "Time is merely a suggestion"], ["THU", "AYCE Tacos", "$29.95 · stretch first"],
  ["FRI", "$6 Bar Rail", "Friday understood the assignment"], ["SAT + SUN", "Brunch", "COMING SOON · 10 AM–2 PM · we’re close"],
];

type SpecialDetail = {title:string;kicker:string;body:string;note:string;items?:string[];rules?:string[];drinks?:string[]};
const happyHourFood = ["Chips & guac", "Chips & queso", "Chips & salsa", "Empanada — chorizo or chicken & cheese", "Cheese quesadilla", "Esquites", "Ceviche tostada", "Mushroom taco", "Blackened fish taco", "Fried chicken taco", "Carnitas taco", "Buñuelos"];
const happyHourDrinks = ["$10 margaritas", "$2 off beer", "$6 bar rail", "20% off wine bottles"];
const ayceTacos = ["Barbacoa", "Baja fish", "Blackened fish", "Carne asada", "Carnitas", "The Chingada", "Chorizo", "Fried chicken", "Halloumi", "Pastor", "Mushroom", "Tinga de pollo", "Shrimp", "Sweet potato"];
const ayceRules = ["Pick three tacos for your first round", "Then order one taco at a time", "One-hour time limit", "One AYCE order per guest", "No sharing — nice try", "Dine-in only · conditions apply"];

const happyHourGroups = [
  { title: "CHIPS & DIPS", note: "Cold drinks need company.", items: ["Chips & guac", "Chips & queso", "Chips & salsa"] },
  { title: "TACOS", note: "Same taco. Same size. Better price.", items: ["Mushroom taco", "Blackened fish taco", "Fried chicken taco", "Carnitas taco"] },
  { title: "MORE GOOD STUFF", note: "For people pretending they came for one drink.", items: ["Cheese quesadilla", "Empanada — chorizo or chicken & cheese", "Esquites", "Ceviche tostada", "Buñuelos"] },
];

function RuleGraphic({ index }: { index: number }) {
  const taco = (x: number, y: number, key: string) => <g key={key} transform={`translate(${x} ${y})`}>
    <path d="M2 31C8 8 42 8 48 31Z" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/>
    <path d="M9 23l8-7 7 5 8-8 9 10" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round"/>
  </g>;
  const common = { viewBox: "0 0 180 112", className: "rule-graphic", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  if (index === 0) return <svg {...common} aria-hidden="true">
    {taco(8, 49, "a")}{taco(65, 49, "b")}{taco(122, 49, "c")}
    <circle cx="151" cy="23" r="19" fill="var(--pink)" stroke="currentColor" strokeWidth="4"/>
    <text x="151" y="31" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">3</text>
  </svg>;

  if (index === 1) return <svg {...common} aria-hidden="true">
    <rect x="12" y="20" width="66" height="76" rx="4" fill="var(--paper)" stroke="currentColor" strokeWidth="4"/>
    <path d="M27 39h36M27 54h25M27 69h31" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <path d="M83 58h37m-12-12 13 12-13 12" stroke="var(--pink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    {taco(125, 47, "one")}
    <circle cx="151" cy="24" r="17" fill="var(--teal)" stroke="currentColor" strokeWidth="4"/>
    <text x="151" y="31" textAnchor="middle" fill="white" fontSize="22" fontWeight="900">1</text>
  </svg>;

  if (index === 2) return <svg {...common} aria-hidden="true">
    <circle cx="90" cy="61" r="39" fill="var(--paper)" stroke="currentColor" strokeWidth="5"/>
    <path d="M90 31v31l22 13M76 12h28M90 12v10" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    <path d="M127 29l10-10" stroke="var(--pink)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M63 80c4-17 25-27 39-14 7 6 10 15 11 25H65Z" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/>
    <text x="90" y="70" textAnchor="middle" fill="var(--pink)" fontSize="18" fontWeight="900">60</text>
  </svg>;

  if (index === 3) return <svg {...common} aria-hidden="true">
    <circle cx="58" cy="34" r="18" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/>
    <path d="M30 94c2-28 12-42 28-42s26 14 28 42" fill="var(--teal)" stroke="currentColor" strokeWidth="4"/>
    <ellipse cx="125" cy="77" rx="42" ry="18" fill="var(--paper)" stroke="currentColor" strokeWidth="4"/>
    {taco(101, 45, "guest")}
    <circle cx="148" cy="29" r="17" fill="var(--pink)" stroke="currentColor" strokeWidth="4"/>
    <text x="148" y="36" textAnchor="middle" fill="white" fontSize="22" fontWeight="900">1</text>
  </svg>;
  if (index === 4) return <svg {...common} aria-hidden="true">
    <ellipse cx="48" cy="73" rx="34" ry="16" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/>
    <ellipse cx="132" cy="73" rx="34" ry="16" fill="var(--teal)" stroke="currentColor" strokeWidth="4"/>
    <path d="M38 27c18 8 27 19 32 34M142 27c-18 8-27 19-32 34" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
    <path d="M49 17l82 82M131 17L49 99" stroke="var(--pink)" strokeWidth="8" strokeLinecap="round"/>
  </svg>;

  return <svg {...common} aria-hidden="true">
    <path d="M22 48 90 12l68 36" fill="var(--pink)" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
    <rect x="34" y="47" width="112" height="55" fill="var(--paper)" stroke="currentColor" strokeWidth="5"/>
    <rect x="76" y="62" width="28" height="40" fill="var(--teal)" stroke="currentColor" strokeWidth="4"/>
    <circle cx="98" cy="82" r="3" fill="var(--yellow)"/>
    <path d="M14 103h152" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    <path d="M123 65h13M123 76h13" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round"/>
  </svg>;
}

const specialDetails: Record<string, SpecialDetail> = {
  happy: {title:"Happy Hour", kicker:"Every damn day · 4–7 PM", body:"All twelve Happy Hour food items are $6 each. Same food. Same portions. A much better reason to leave work on time.", items:happyHourFood, drinks:happyHourDrinks, note:"Wednesday keeps the complete $6 food lineup going all day. Dine-in only. Welcome to La Chingada."},
  ayce: {title:"All You Can Eat Tacos", kicker:"Every Thursday · $29.95 per person", body:"Fourteen proper tacos. One glorious hour. Come hungry and choose irresponsibly well.", items:ayceTacos, rules:ayceRules, note:"Ask your server about dietary needs and current conditions before ordering."},
  Monday: {title:"Margarita Monday", kicker:"Monday · all margaritas $10", body:"Ten margaritas. Ten bucks each. Monday has officially stopped being useless.", note:"Dine-in only · Ten margaritas to choose from. Pace yourself, legend."},
  Tuesday: {title:"Taco Tuesday", kicker:"Tuesday · any 3 tacos for $20", body:"Build a responsible trio—or choose entirely based on vibes. We support both methods.", note:"Dine-in only · Available taco selection and conditions apply."},
  Wednesday: {title:"Happy Hour All Day", kicker:"Wednesday · all damn day", body:"All twelve Happy Hour food items are $6 each from open to close. Time is merely a suggestion.", items:happyHourFood, drinks:happyHourDrinks, note:"All twelve $6 food items run all day. Drink offers remain subject to current service conditions. Dine-in only."},
  Thursday: {title:"AYCE Tacos", kicker:"Thursday · $29.95 per person", body:"Fourteen tacos. One hour. Stretch first.", items:ayceTacos, rules:ayceRules, note:"Ask your server about dietary needs and current conditions before ordering."},
  Friday: {title:"Friday Bar Rail", kicker:"Friday · $6 bar rail", body:"Vodka, tequila, gin, rum or rye—with a mixer or as a shot. Friday understood the assignment.", note:"Dine-in only · Responsible service and availability apply."},
  Saturday: {title:"Weekend Brunch · Coming Soon", kicker:"Saturday · coming soon · 10 AM–2 PM", body:"We’re close. Weekend brunch is nearly ready — proper La Chingada breakfast food, without suddenly becoming sensible.", note:"Coming soon. We’ll announce the launch date as soon as the kitchen is ready."},
  Sunday: {title:"Weekend Brunch · Coming Soon", kicker:"Sunday · coming soon · 10 AM–2 PM", body:"We’re close. Weekend brunch is nearly ready — proper La Chingada breakfast food, without suddenly becoming sensible.", note:"Coming soon. We’ll announce the launch date as soon as the kitchen is ready."},
};

const producerNames: Array<[string,string]> = [
  ["818", "818 Tequila"], ["1800", "Casa Cuervo / 1800 Tequila"], ["CABO WABO", "Cabo Wabo Tequila"],
  ["CASAMIGOS", "Casamigos"], ["CAZADORES", "Tequila Cazadores"], ["CINCORO", "Cincoro Tequila"],
  ["CLASE AZUL", "Clase Azul México"], ["CODIGO", "Código 1530"], ["DON JULIO", "Tequila Don Julio"],
  ["ESPOLON", "Espolòn / Casa San Nicolás"], ["HERRADURA", "Casa Herradura"], ["HORNITOS", "Hornitos / Casa Sauza"],
  ["JOSE CUERVO", "José Cuervo"], ["OLMECA ALTOS", "Olmeca Altos"], ["PATRON", "Patrón"],
  ["TEREMANA", "Teremana Tequila"], ["TROMBA", "Tequila Tromba"], ["DEL MAGUEY", "Del Maguey"],
  ["MONTELOBOS", "Montelobos Mezcal"], ["BANHEZ", "Bañhez Mezcal"], ["ILEGAL", "Ilegal Mezcal"],
  ["OJO DE TIGRE", "Ojo de Tigre Mezcal"], ["DOS HOMBRES", "Dos Hombres Mezcal"], ["EL SILENCIO", "Mezcal El Silencio"],
];

type VerifiedBrand = {producer:string;region:string;nom:string;source:string};
const verifiedBrands: Array<[string,VerifiedBrand]> = [
  ["818",{producer:"818 Tequila",region:"Jalisco · Los Valles",nom:"NOM 1607",source:"https://www.agavematchmaker.com/brands/2614-818-tequila"}],
  ["1800",{producer:"Casa Cuervo / 1800 Tequila",region:"Jalisco · Los Valles",nom:"NOM 1122",source:"https://www.agavematchmaker.com/brands"}],
  ["CASAMIGOS",{producer:"Casamigos Tequila",region:"Jalisco · Ciénega",nom:"NOM 1609",source:"https://www.agavematchmaker.com/brands/1354-casamigos-tequila"}],
  ["CAZADORES",{producer:"Tequila Cazadores",region:"Jalisco · Los Altos Southern",nom:"NOM 1487",source:"https://www.agavematchmaker.com/brands/75-cazadores"}],
  ["CENOTE",{producer:"Cenote Tequila",region:"Jalisco · Los Valles",nom:"NOM 1472",source:"https://www.agavematchmaker.com/brands?page=15"}],
  ["CINCORO",{producer:"Cincoro Tequila",region:"Jalisco · Los Valles",nom:"NOM 1438",source:"https://www.agavematchmaker.com/brands/2280-cincoro-tequila"}],
  ["DON JULIO",{producer:"Tequila Don Julio",region:"Jalisco · Ciénega",nom:"NOM 1449",source:"https://www.agavematchmaker.com/brands/875-don-julio"}],
  ["EL MEXICANO",{producer:"El Mexicano",region:"Jalisco · Los Altos Southern",nom:"NOM 1588",source:"https://www.agavematchmaker.com/brands"}],
  ["EL TEQUILENO",{producer:"El Tequileño",region:"Jalisco · Los Valles",nom:"NOM 1108",source:"https://www.agavematchmaker.com/brands"}],
  ["EL TESORO",{producer:"El Tesoro de Don Felipe",region:"Jalisco · Los Altos Southern",nom:"NOM 1139",source:"https://www.agavematchmaker.com/brands"}],
  ["ELEVACION 1250",{producer:"Elevación1250",region:"Jalisco · Los Valles",nom:"NOM 1522",source:"https://www.agavematchmaker.com/brands"}],
  ["ESPOLON",{producer:"Espolòn / Casa San Nicolás",region:"Jalisco · Los Altos Southern",nom:"NOM 1440",source:"https://www.agavematchmaker.com/brands"}],
  ["FLECHA AZUL",{producer:"Flecha Azul",region:"Jalisco · Los Valles",nom:"NOM 1110",source:"https://www.agavematchmaker.com/brands"}],
  ["JOSE CUERVO",{producer:"José Cuervo",region:"Jalisco · Los Valles",nom:"NOM 1122",source:"https://www.agavematchmaker.com/brands/128-jose-cuervo"}],
  ["MALA VIDA",{producer:"Mala Vida",region:"Jalisco · Los Altos Southern",nom:"NOM 1588",source:"https://www.agavematchmaker.com/brands"}],
  ["SAUZA TRES GENERACIONES",{producer:"Casa Sauza / Tres Generaciones",region:"Jalisco · Los Valles",nom:"NOM 1102",source:"https://www.agavematchmaker.com/brands/982-sauza-tequila"}],
  ["SIEMPRE",{producer:"Siempre Tequila",region:"Jalisco · Los Altos Southern",nom:"NOM 1414",source:"https://www.agavematchmaker.com/brands"}],
  ["VOLCAN",{producer:"Volcan de Mi Tierra",region:"Jalisco · Los Valles",nom:"NOM 1523",source:"https://www.agavematchmaker.com/brands"}],
];

function factsForBottle(bottle: AgaveRecord) {
  const upper = bottle.name.toUpperCase();
  const archive = archiveDetails[bottle.name];
  const catalog = catalogDetails[bottle.name];
  const verified = verifiedBrands.find(([prefix]) => upper.startsWith(prefix))?.[1];
  const producer = verified?.producer || producerNames.find(([prefix]) => upper.startsWith(prefix))?.[1] || upper.replace(/\s+(BLANCO|SILVER|PLATA|REPOSADO|AÑEJO|JOVEN).*$/, "");
  const isMezcal = bottle.type === "Mezcal";
  const isInfused = bottle.category === "House Infused";
  let agave = "Blue Weber agave (Agave tequilana Weber var. azul)";
  if (isMezcal) {
    if (upper.includes("CUPREATA")) agave = "Cupreata agave";
    else if (upper.includes("ESPADIN") && upper.includes("BARRIL")) agave = "Espadín and Barril agaves";
    else if (upper.includes("ESPADIN")) agave = "Espadín agave (Agave angustifolia)";
    else agave = "Agave variety varies by this mezcal expression; label verification required";
  }
  const region = archive?.region || catalog?.origin || (isInfused ? "Prepared in-house at La Chingada, Toronto, using an agave-spirit base" : verified?.region ||
    isMezcal ? (upper.includes("DEL MAGUEY VIDA") ? "San Luis del Río, Oaxaca, Mexico" : upper.includes("PUEBLA") ? "Puebla, Mexico" : "Mexico — denomination-specific origin varies by expression") :
    upper.includes("ESPOLON") ? "Los Altos de Jalisco, Mexico" : upper.includes("JOSE CUERVO") ? "Tequila, Jalisco, Mexico" : "Mexico — within the Tequila Denomination of Origin");
  const production = catalog?.how || (isInfused ? "House infusion; preparation time and ingredients vary by flavour" :
    bottle.category === "Blanco" ? "Blanco tequila: bottled without maturation or rested in oak for no more than two months" :
    bottle.category === "Reposado" ? "Reposado tequila: matured in oak for at least two months" :
    bottle.category === "Añejo" ? "Añejo tequila: matured in oak containers of 600 litres or less for at least one year" :
    bottle.category === "Speciality" ? (upper.includes("EXTRA AÑEJO") || upper.includes("X.A.") ? "Extra añejo tequila: matured in oak for at least three years" : upper.includes("CRISTALINO") || upper.includes("EL CIELO") || upper.includes("'70") ? "Cristalino-style expression: matured tequila filtered to remove most of its colour" : "Speciality expression; maturation or cask treatment depends on the exact label") :
    "Mezcal expression; production method and certification category vary by producer");
  const nom = isMezcal ? "Mezcal certification / producer record varies" : isInfused ? "House-prepared record" : verified?.nom || "NOM verification continuing";
  const source = verified?.source || (isMezcal ? "https://www.mezcalreviews.com/" : "https://www.agavematchmaker.com/");
  const status = catalog ? "Drink Bible record matched" : archive ? "Tasting archive matched · current verification recommended" : verified ? "Region and NOM matched · classification checked" : producerNames.some(([prefix]) => upper.startsWith(prefix)) ? "Brand identified · bottle verification continuing" : "Collection label identified · bottle verification continuing";
  return {producer, region, agave:archive?.agave || agave, production, nom, source, status, archive, catalog};
}

function noteTags(value?: string) {
  return value ? value.split(/[·.]/).map(x=>x.trim()).filter(Boolean).slice(0,8) : [];
}

const weeklyHours: Record<string,[number,number]> = {Sunday:[12,21],Monday:[16,22],Tuesday:[16,22],Wednesday:[16,22],Thursday:[12,23],Friday:[12,23],Saturday:[12,23]};
function torontoStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA",{timeZone:"America/Toronto",weekday:"long",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(now);
  const value = (type:string)=>parts.find(part=>part.type===type)?.value||"";
  const day=value("weekday"); const minutes=Number(value("hour"))*60+Number(value("minute")); const [open,close]=weeklyHours[day]||[0,0];
  const fmt=(hour:number)=>hour>12?`${hour-12} PM`:hour===12?"12 PM":`${hour} AM`;
  if(minutes>=16*60&&minutes<19*60&&minutes>=open*60&&minutes<close*60) return {day,label:"HAPPY HOUR IS ON",detail:"UNTIL 7 PM",state:"happy"};
  if(minutes>=open*60&&minutes<close*60) return {day,label:"OPEN NOW",detail:`UNTIL ${fmt(close)}`,state:"open"};
  return {day,label:"CLOSED",detail:minutes<open*60?`BACK AT ${fmt(open)}`:"SEE YOU TOMORROW",state:"closed"};
}


function SpiceLevel({ level }: { level: number }) {
  const count = Math.max(1, Math.min(3, level));
  return <span className="spice-level" aria-label={`${count} chilli${count === 1 ? "" : "s"} spicy`} title={`${count}/3 heat`}>
    {Array.from({length:count},(_,index)=><svg key={index} viewBox="0 0 24 24" aria-hidden="true"><path className="chilli-body" d="M4.5 15.5c2.1-4 5.2-5.2 8.2-5.2 4.2 0 6.2-2.3 6.9-6.3 2.5 7.2-.8 14.3-7.4 15.7-3.7.8-6.7-.9-7.7-4.2Z"/><path className="chilli-stem" d="M18.8 7.7c-.2-2.3 1-4 3-4.8"/></svg>)}
  </span>;
}

function SpecialIcon({ index }: { index: number }) {
  const common = { viewBox: "0 0 64 64", className: "special-icon", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  if (index === 0) return <svg {...common} aria-hidden="true"><path d="M14 12h36L34 35v12h10M24 51h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="47" cy="15" r="8" fill="var(--yellow)" stroke="currentColor" strokeWidth="3"/><path d="M43 10l8 10" stroke="currentColor" strokeWidth="2"/></svg>;
  if (index === 1) return <svg {...common} aria-hidden="true"><path d="M9 43c4-20 19-31 23-31s19 11 23 31Z" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/><path d="M16 35l9-9 8 7 8-10 9 12" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round"/><path d="M13 47h38" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
  if (index === 2) return <svg {...common} aria-hidden="true"><circle cx="32" cy="32" r="15" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/><path d="M32 7v8M32 49v8M7 32h8M49 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><path d="M32 23v10l8 5" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round"/></svg>;
  if (index === 3) return <svg {...common} aria-hidden="true"><path d="M6 45c3-14 13-22 17-22s14 8 17 22Z" fill="var(--yellow)" stroke="currentColor" strokeWidth="3"/><path d="M25 45c3-18 14-29 19-29s12 9 15 29Z" fill="var(--orange)" stroke="currentColor" strokeWidth="3"/><path d="M12 39l7-7 6 6M34 37l8-9 8 9" stroke="var(--pink)" strokeWidth="3" strokeLinecap="round"/></svg>;
  if (index === 4) return <svg {...common} aria-hidden="true"><path d="M17 15h30l-4 32H21Z" fill="var(--teal)" stroke="currentColor" strokeWidth="4"/><path d="M22 24h20M24 33h16" stroke="white" strokeWidth="3" strokeLinecap="round"/><path d="M15 51h34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
  return <svg {...common} aria-hidden="true"><ellipse cx="32" cy="42" rx="23" ry="10" fill="var(--paper)" stroke="currentColor" strokeWidth="4"/><path d="M17 38c5-15 10-21 15-21s10 6 15 21" fill="var(--yellow)" stroke="currentColor" strokeWidth="4"/><circle cx="32" cy="28" r="6" fill="var(--pink)"/><path d="M11 14h13M40 14h13" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
}

export default function Home() {
  const [group, setGroup] = useState("Tacos");
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const [ageOpen, setAgeOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [agaveQuery, setAgaveQuery] = useState("");
  const [agaveCategory, setAgaveCategory] = useState("All");
  const [openBottle, setOpenBottle] = useState<AgaveRecord | null>(null);
  const [openSpecial, setOpenSpecial] = useState<string | null>(null);
  const [day, setDay] = useState("Monday");
  const [liveStatus, setLiveStatus] = useState({day:"",label:"CHECK TODAY’S HOURS",detail:"TORONTO TIME",state:"closed"});
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationLoaded, setReservationLoaded] = useState(false);
  const [reservationSlow, setReservationSlow] = useState(false);
  const reservationOpener = useRef<HTMLElement | null>(null);
  const reservationDialog = useRef<HTMLDivElement | null>(null);
  const reservationCloseButton = useRef<HTMLButtonElement | null>(null);

  const openReservation = (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    reservationOpener.current = event.currentTarget;
    setReservationLoaded(false);
    setReservationSlow(false);
    setReservationOpen(true);
  };

  const closeReservation = () => {
    setReservationOpen(false);
    setReservationSlow(false);
    window.requestAnimationFrame(() => reservationOpener.current?.focus());
  };

  const filtered = useMemo(() => dishes.filter(d => d.group === group && (filter === "ALL" || d.tags?.includes(filter)) && d.name.toLowerCase().includes(query.toLowerCase())), [group, filter, query]);
  useEffect(()=>{const update=()=>{const status=torontoStatus();setDay(status.day);setLiveStatus(status)};update();const timer=setInterval(update,60000);return()=>clearInterval(timer)},[]);
  useEffect(() => {
    if (!reservationOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => reservationCloseButton.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setReservationOpen(false);
        window.requestAnimationFrame(() => reservationOpener.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !reservationDialog.current) return;
      const focusable = Array.from(reservationDialog.current.querySelectorAll<HTMLElement>('button,[href],iframe,input,select,textarea,[tabindex]:not([tabindex="-1"])'))
        .filter(element => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [reservationOpen]);
  useEffect(() => {
    if (!reservationOpen || reservationLoaded) return;
    const timer = window.setTimeout(() => setReservationSlow(true), 10000);
    return () => window.clearTimeout(timer);
  }, [reservationOpen, reservationLoaded]);


  const agaveCategories = ["All", "Blanco", "Reposado", "Añejo", "Mezcal", "Speciality", "House Infused"];
  const collectionRecords = useMemo(()=>[...agaveRecords,...houseInfusions],[]);
  const filteredAgave = useMemo(() => collectionRecords.filter(bottle => {
    const facts = factsForBottle(bottle);
    const haystack = [bottle.name,bottle.category,bottle.type,facts.producer,facts.region,facts.agave,facts.nom].join(" ").toLowerCase();
    return (agaveCategory === "All" || bottle.category === agaveCategory) && haystack.includes(agaveQuery.toLowerCase());
  }).sort((a,b)=>Number(Boolean(archiveDetails[b.name]?.image))-Number(Boolean(archiveDetails[a.name]?.image)) || a.name.localeCompare(b.name)), [agaveCategory, agaveQuery, collectionRecords]);

  return <main>
    <header className="topbar">
      <a className="site-logo nav-logo" href="#top" aria-label="La Chingada home"><img src="/images/la-chingada-logo-white.png" alt="La Chingada"/></a>
      <nav className="primary-nav" aria-label="Primary navigation"><a href="#menu">Menu</a><a href="#specials">Specials</a><a href="#agave">Agave Library</a><a href="#about">Our Story</a><a href="#visit">Contact</a></nav>
      <div className="nav-actions"><a className={`live-status ${liveStatus.state}`} href="#visit"><b>{liveStatus.label}</b><span>{liveStatus.detail}</span></a><button type="button" className="reserve small" onClick={openReservation}>Book a spot</button></div>
    </header>
    <div className="brunch-ticker" role="status" aria-label="Brunch coming soon. We're almost there."><div className="brunch-ticker-track" aria-hidden="true"><span>BRUNCH COMING SOON! · WE’RE ALMOST THERE · BEAR WITH US — THE EGGS ARE STILL GETTING THEIR ACT TOGETHER ·</span><span>BRUNCH COMING SOON! · WE’RE ALMOST THERE · BEAR WITH US — THE EGGS ARE STILL GETTING THEIR ACT TOGETHER ·</span><span>BRUNCH COMING SOON! · WE’RE ALMOST THERE · BEAR WITH US — THE EGGS ARE STILL GETTING THEIR ACT TOGETHER ·</span></div></div>

    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">Mexican Street Food · Dundas West</p><span className="launch-stamp">NEW MENU · NOW SERVING</span><h1>SERIOUS TACOS.<br/>QUESTIONABLE<br/>BEHAVIOUR.</h1><p className="deck">Fresh tortillas every morning, obsessive margaritas every night, and absolutely no interest in doing things the easy way.</p><div className="actions"><a className="button red" href="#menu">Explore the menu ↓</a><button type="button" className="button paper" onClick={openReservation}>Book a spot →</button><a className="button yellow" href="https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ" target="_blank" rel="noreferrer">Order delivery →</a></div><img className="hero-chingadito" src="/images/chingadito-peek.png" alt="Chingadito peeking into the La Chingada homepage"/></div>
      <div className="hero-art"><img src="/images/street-corn-hero.jpg" alt="La Chingada Mexican street corn served on a wooden board"/><div className="sunburst" aria-hidden="true">✹</div><p>GOOD FOOD.<br/>NO FUSS.</p></div>
    </section>

    <section className="poster-row" aria-label="Featured offers">
      <button className="poster poster-happy" onClick={()=>setOpenSpecial("happy")}><span>EVERY DAY · 4–7</span><h2>HAPPY HOUR<br/>$6 FOOD</h2><p>12 food items · $6 each →</p></button>
      <button className="poster poster-ayce" onClick={()=>setOpenSpecial("ayce")}><span>EVERY THURSDAY</span><h2>AYCE<br/>TACOS</h2><p>$29.95 per person →</p></button>
      <button className="poster poster-today" onClick={()=>setOpenSpecial(day)}><i>HAPPENING TODAY</i><span>{day.toUpperCase()}</span><h2>{specialDetails[day]?.title}</h2><p>Open today’s card →</p></button>
    </section>

    <section className="identity-intro patterned" aria-label="What makes La Chingada different">
      <div className="menu-feature"><img src="/images/tacos-real-food.png" alt="Two fresh tacos made at La Chingada"/><div><p className="eyebrow">Made here. Every morning.</p><h3>REAL FOOD.<br/>REAL WORK.</h3><p>Fresh masa, whole ingredients and no invisible shortcuts. Open a dish for ingredients, dietary information and the story behind it.</p></div><img className="menu-chingadito" src="/images/chingadito-press.png" alt="Chingadito under the tortilla press"/></div>
      <section className="margarita-manifesto" aria-labelledby="margarita-title">
        <div className="marg-hero">
          <div className="marg-copy">
            <div className="marg-overline"><span>HOUSE BAR PROGRAM</span><b>11 SIGNATURE MARGARITAS</b></div>
            <p className="eyebrow">The bar is not an afterthought</p>
            <h3 id="margarita-title"><span>THE BEST MARGS</span><em>IN TORONTO.</em></h3>
            <p>House-infused tequila, our own triple sec, real fruit and rims built from scratch. Bold drinks with proper prep behind every glass.</p>
            <div className="marg-actions">
              <button onClick={()=>{setGroup("Margaritas");document.querySelector("#menu")?.scrollIntoView()}}>Meet the lineup →</button>
              <button className="marg-happy-link" onClick={()=>setOpenSpecial("happy")}>Happy Hour details →</button>
            </div>
            <div className="marg-stats" aria-label="Margarita program highlights">
              <div><strong>11</strong><span>signature margaritas</span></div>
              <div><strong>$10</strong><span>during Happy Hour</span></div>
              <div><strong>100%</strong><span>house-built flavour</span></div>
            </div>
          </div>
          <figure className="marg-visual">
            <img src="/images/margarita-patio-photo.webp" alt="A diamond-cut rocks glass margarita on La Chingada’s patio beside tacos" loading="lazy" decoding="async"/>
            <div className="marg-price-stamp"><small>HAPPY HOUR</small><b>$10</b><span>MARGARITAS</span></div>
          </figure>
        </div>
        <div className="marg-work" aria-label="How La Chingada builds its margarita program">
          <article><i>01</i><span>48 HRS → 2 WEEKS</span><strong>House-infused tequila</strong><p>Blueberry, pineapple, lavender, jalapeño, habanero and ghost pepper. Some infusions take two days; the stubborn ones rest for two weeks.</p></article>
          <article><i>02</i><span>ORANGE PEEL · GRAPEFRUIT ZEST</span><strong>Our own triple sec</strong><p>Citrus peel becomes a brighter, fresher liqueur built specifically to lift the roasted sweetness of agave.</p></article>
          <article><i>03</i><span>UP TO 7 DAYS</span><strong>Infused salts & sugars</strong><p>Lime salt, chili salts and lavender sugar are slowly dried and ground in-house for flavour, aroma and texture.</p></article>
          <article><i>04</i><span>48 HRS → 1 WEEK</span><strong>Syrups & liqueurs</strong><p>Vanilla, strawberry, ginger and more are infused or carefully cooked, then measured, rested and repeatedly tasted.</p></article>
          <article><i>05</i><span>17 → 48 HOURS</span><strong>Garnishes with a work ethic</strong><p>Fruit is sliced, sometimes candied overnight, and dehydrated to finish each drink with the right aroma, flavour and texture.</p></article>
          <article><i>06</i><span>REAL FRUIT · REAL INGREDIENTS</span><strong>Fresh aguas frescas</strong><p>Strawberry, hibiscus, citrus, horchata, pineapple and mango. Fresh, bright and made without mystery filler.</p></article>
        </div>
        <div className="happy-proof">
          <strong>SAME POUR.<br/>SAME GLASS.<br/>SAME TACO.</strong>
          <p>Happy Hour and AYCE are not where we cut corners. The margarita gets the same alcohol in the same glass, and the taco stays the same size—just at a better time to share the table and try more.</p>
          <button onClick={()=>setOpenSpecial("happy")}>See Happy Hour →</button>
        </div>
        <div className="marg-stamp"><span>SERIOUS BAR.</span><span>NOT-SO-SERIOUS PEOPLE.</span></div>
      </section>
    </section>

    <section className="menu-section patterned"><div className="section-head"><div><p className="eyebrow">Tap around. Find your thing.</p><h2>THE MENU</h2></div><p>Food, drinks, specials and enough detail to decide before you sit down.</p></div>
      <div className="special-menu-strip" aria-label="Special food menus"><button onClick={()=>setOpenSpecial("happy")}><span>EVERY DAY · 4–7 PM</span><h3>HAPPY HOUR FOOD</h3><p>12 food items · $6 each · Wednesday all day</p><b>See every item +</b></button><button onClick={()=>setOpenSpecial("ayce")}><span>THURSDAY · $29.95 PP</span><h3>AYCE TACOS</h3><p>14 taco choices · one-hour limit</p><b>See tacos & rules +</b></button></div>
      <div className="menu-tools" id="menu"><div className="menu-kind-labels"><span>FOOD</span><span>BAR</span></div><div className="tabs">{["Special Menus","Appetizers","Tacos","Meals","Desserts","Brunch","Margaritas","Cocktails","Beer","Wine","Non-Alcoholic"].map(x=><button key={x} className={group===x?"active":""} onClick={()=>{setGroup(x);setFilter("ALL")}}>{x}</button>)}</div><div className="filters"><input aria-label="Search menu" placeholder="Search this menu…" value={query} onChange={e=>setQuery(e.target.value)}/>{["ALL","GF","V","VG"].map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div></div>
      {group==="Special Menus"&&<div className="integrated-specials"><button onClick={()=>setOpenSpecial("happy")}><span>EVERY DAY · 4–7</span><h3>HAPPY HOUR</h3><p>12 food items · $6 each · 4 drink deals</p><b>Clock out early →</b></button><button onClick={()=>setOpenSpecial("ayce")}><span>THURSDAY · $29.95</span><h3>AYCE TACOS</h3><p>14 tacos · one glorious hour</p><b>Stretch first →</b></button></div>}
      <div className="dish-grid">{filtered.map(d=><button className={`dish ${d.image?"dish-featured":""}`} key={d.name} onClick={()=>setOpenDish(d)}>{d.image&&<img src={d.image} alt={d.name}/>}<div>{d.feature&&<em>{d.feature}</em>}<h3>{d.name} {d.spicy && <SpiceLevel level={typeof d.spicy === "number" ? d.spicy : 1}/>}</h3><div className="tags">{d.tags?.map(t=><i className={`tag-${t.toLowerCase()}`} key={t}>{t}</i>)}</div></div><strong>{d.price}</strong><p>{d.desc}</p><span className="more">More details +</span></button>)}</div>
      {!filtered.length && group!=="Special Menus" && <p className="empty">Nothing matches that filter yet.</p>}
    </section>

    <section className="specials" id="specials"><div className="section-head light"><div><p className="eyebrow">There’s always something going on</p><h2>WEEKLY<br/>SPECIALS</h2></div><p>Dine-in only. Ask the team for today’s details.</p></div><div className="special-grid">{specials.map((s,i)=><button key={s[0]} className={`special s${i}`} onClick={()=>setOpenSpecial(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][i])}><SpecialIcon index={i}/><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><b>Open details +</b></button>)}</div></section>

    <section className="agave" id="agave"><div><p className="eyebrow">For adult guests · 19+</p><h2>THE AGAVE<br/>LIBRARY</h2><p className="agave-copy">A field guide to the bottles behind the bar: where they come from, who makes them, which agave they use, and the stories worth knowing.</p><button className="button pink" onClick={()=>setAgeOpen(true)}>Enter the library →</button></div><div className="library-card"><span>FIELD NOTES · 001</span><div className="plant">♆</div><h3>150+ BOTTLES.<br/>A LOT OF STORIES.</h3><p>Search by region, producer, agave, and flavour profile. Informational catalogue for adults.</p></div></section>

    <section className="craft" id="about">
      <div className="craft-hero"><p className="eyebrow">The work before the welcome</p><h2>BEFORE<br/>WE OPEN.</h2><div className="craft-manifesto"><strong>YOU SEE A TACO.</strong><span>What you don’t see is everything it took to make it.</span><p>Before the first guest arrives, the kitchen is already cooking, grinding, pressing, blending, infusing and preparing. We make the things most restaurants simply buy.</p></div><img className="chingadito chingadito-corn" src="/images/chingadito-corn.png" alt="Chingadito carrying a sack of corn"/></div>

      <div className="corn-journey">
        <div className="journey-intro">
          <p className="eyebrow">One tortilla. The whole story.</p>
          <h3>FROM MEXICAN CORN<br/>TO YOUR TABLE.</h3>
          <p className="journey-deck">Six steps. One daily process. The tortilla beneath your taco begins long before service.</p>
        </div>
        <div className="journey-grid">
          {[
            {number:"01",stage:"SOURCE",title:"FROM MEXICO, BY THE TONNE",body:"Every six months, we import one tonne of corn from Mexico to Canada. It starts at the source.",image:"/images/corn-journey-01.webp",alt:"Chingadito carrying a large sack of corn on its journey from Mexico"},
            {number:"02",stage:"COOK",title:"COOKED EVERY DAY",body:"Each morning, the corn is cooked in-house, then cooled properly before the next step.",image:"/images/corn-journey-02.webp",alt:"Chingadito stirring corn in a large steaming kitchen pot"},
            {number:"03",stage:"GRIND",title:"GROUND INTO MASA",body:"The cooked corn is ground fresh into masa in our kitchen every day.",image:"/images/corn-journey-03.webp",alt:"Chingadito grinding cooked corn into fresh masa"},
            {number:"04",stage:"PRESS",title:"MACHINE-PRESSED",body:"Each tortilla is pressed every morning to La Chingada’s own size and shape.",image:"/images/corn-journey-04.webp",alt:"Chingadito using the tortilla pressing machine"},
            {number:"05",stage:"GRILL",title:"GRILLED FOR SERVICE",body:"The tortillas are cooked, cooled and prepared for that day’s service.",image:"/images/corn-journey-05.webp",alt:"Chingadito grilling fresh tortillas on the flat top"},
            {number:"06",stage:"SERVE",title:"ON YOUR TACO",body:"The tortilla under your taco started as corn from Mexico and was made here that morning.",image:"/images/corn-journey-06.webp",alt:"Chingadito proudly presenting a tray of finished tacos"},
          ].map((step,index)=><article className={`journey-card journey-card-${index+1}`} key={step.number}>
            <div className="journey-art"><img src={step.image} alt={step.alt} loading="lazy" decoding="async"/></div>
            <div className="journey-copy">
              <span className="journey-number">{step.number}</span>
              <div className="journey-text"><i>{step.stage}</i><h4>{step.title}</h4><p>{step.body}</p></div>
            </div>
          </article>)}
        </div>
        <blockquote><span>THE WHOLE POINT</span>THE TORTILLA UNDER YOUR TACO WAS MADE HERE THAT MORNING.</blockquote>
      </div>

      <div className="prep-wall"><div className="prep-title"><p className="eyebrow">The things you never see</p><h3>WE MAKE THE STUFF<br/>OTHER PLACES ORDER.</h3></div><div className="prep-grid">
        <article className="prep-card orange"><strong>EVERY MORNING</strong><h4>Fresh tortillas</h4><p>Cooked, ground, pressed and made fresh for service.</p></article>
        <article className="prep-card pink"><strong>FROM SCRATCH</strong><h4>House hot sauces</h4><p>Built here from whole ingredients—not tipped from a commercial bottle.</p></article>
        <article className="prep-card green"><strong>48 HOURS → 2 WEEKS</strong><h4>Bar infusions</h4><p>Fruit, flowers, herbs and chilis—from lavender to ghost pepper—rest until the flavour is exactly where we want it.</p></article>
        <article className="prep-card cream"><strong>17 → 48 HOURS</strong><h4>Dehydrated garnishes</h4><p>Sliced precisely, sometimes candied overnight, separated and slowly dried. Some get a triple-sec mist and a sugar-citric finish.</p></article>
        <article className="prep-card yellow"><strong>UP TO 7 DAYS</strong><h4>Salts, rims and purées</h4><p>Lime salts, chili salts, infused sugars and fresh purées—made for flavour, occasionally for the ’gram, never from a mystery tub.</p></article>
        <article className="prep-card teal"><strong>REAL FRUIT · REAL INGREDIENTS</strong><h4>Fresh aguas frescas</h4><p>Strawberry, hibiscus, citrus, horchata, pineapple and mango—fresh, bright and sparkling to lift them even more. No store-bought filler hiding in the jug.</p></article>
      </div></div>

      <div className="about-place"><div className="place-collage"><div className="place-photo patio"><span>THE HIDDEN PATIO</span></div><div className="place-photo bar"><img src="/images/la-chingada-bar-interior.jpg" alt="La Chingada’s illuminated back bar lined with agave spirits" loading="lazy" decoding="async"/><span>THE BAR</span></div><div className="place-photo inside"><span>INSIDE LA CHINGADA</span></div><img className="chingadito chingadito-peek" src="/images/chingadito-peek.png" alt="Chingadito peeking from behind the restaurant photographs"/></div><div className="place-copy"><p className="eyebrow">After all that work</p><h3>WE SET<br/>THE TABLE.</h3><p>La Chingada should feel like arriving at a friend’s place—if your friend made fresh tortillas every morning, had a hidden patio and refused to take shortcuts.</p><strong>MEXICAN CORN.<br/>TORONTO HANDS.<br/>MADE HERE. EVERY DAY.</strong><div className="actions"><a className="button red" href="#menu">See what we make</a><button type="button" className="button paper" onClick={openReservation}>Come experience it</button></div></div></div>
    </section>

    <section className="visit visit-compact" id="visit">
      <header className="visit-compact-head">
        <div><p className="eyebrow">Come find us</p><h2>VISIT LA CHINGADA.</h2></div>
        <aside className="visit-intro-card"><p>Mexican street food on Dundas West, a hidden back patio and room for walk-ins.</p><div><button type="button" onClick={openReservation}>Book a spot →</button><a href="https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto" target="_blank" rel="noreferrer">Get directions →</a></div><img src="/images/chingadito-corn.png" alt="Chingadito arriving at La Chingada"/></aside>
      </header>
      <div className="visit-compact-grid">
        <article className="visit-card visit-find"><span>01</span><h3>Find us</h3><p>1242 Dundas Street West<br/>Toronto, Ontario · M6J 1X5</p><a href="https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto" target="_blank" rel="noreferrer">Open in Maps →</a></article>
        <article className="visit-card visit-contact"><span>02</span><h3>Call, follow or order</h3><p><a href="tel:+14165352242">416-535-2242</a><br/><a href="mailto:reservations@lachingada.ca">reservations@lachingada.ca</a></p><a href="https://www.instagram.com/la_chingada/" target="_blank" rel="noreferrer">@la_chingada →</a><a href="https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ" target="_blank" rel="noreferrer">Order delivery →</a></article>
        <article className="visit-card visit-book"><span>03</span><h3>Book a spot</h3><p>Reservations are available for groups of up to six. Walk-ins are always welcome when service allows.</p><button type="button" className="visit-action" onClick={openReservation}>Check availability →</button></article>
        <article className="visit-card visit-arrival"><span>04</span><h3>Patio & getting here</h3><p>The hidden back patio is first come, first served and weather dependent. The 505 Dundas streetcar serves the neighbourhood; street parking is limited.</p><a href="tel:+14165352242">Call with questions →</a></article>
        <article className="visit-card visit-hours"><div className="visit-hours-head"><div><span>05</span><h3>Hours</h3></div><div className="hours-status"><b>{liveStatus.label}</b> · {liveStatus.detail}</div></div><ul>{Object.entries(weeklyHours).map(([name,[open,close]])=><li className={day===name?"today-hours":""} key={name}><strong>{name}</strong><span>{open>12?open-12:open}:00 {open>=12?"PM":"AM"}–{close>12?close-12:close}:00 PM</span></li>)}</ul><small>Toronto time · Happy Hour every day, 4–7 PM.</small></article>
      </div>
    </section>

    <section className="reservation-cta patterned" id="reserve">
      <div className="reservation-cta-copy">
        <p className="eyebrow">Planning ahead?</p>
        <h2>MAKE A<br/>RESERVATION.</h2>
        <p className="reservation-lede">We’ll always do what we can to get you in. Happy Hour, AYCE Tacos and peak dinner service can fill quickly, so your first choice may not always be available.</p>
        <p className="reservation-guidance">Try another time or day—or come by and ask about a walk-in table. Reservations are available for groups of up to six.</p>
        <div className="reservation-pills"><span>HAPPY HOUR GETS BUSY</span><span>AYCE THURSDAYS FILL FAST</span><span>GROUPS UP TO 6</span></div>
        <div className="actions"><button type="button" className="button pink" onClick={openReservation}>Check availability →</button><a className="button paper" href="tel:+14165352242">Call 416-535-2242</a></div>
      </div>
      <aside className="reservation-cta-card">
        <span className="reservation-card-kicker">A LITTLE HEADS-UP</span>
        <h3>BUSY DOESN’T ALWAYS MEAN IMPOSSIBLE.</h3>
        <p>If your preferred time is gone, the next available slot may only be a little earlier or later. Check a second time, try another day, or stop by—we keep room for walk-ins when service allows.</p>
        <div className={`reservation-card-status ${liveStatus.state}`}><b>{liveStatus.label}</b><span>{liveStatus.detail}</span></div>
        <img src="/images/chingadito-peek.png" alt="Chingadito peeking into the reservation section"/>
      </aside>
    </section>

    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <a className="site-logo footer-logo" href="#top" aria-label="La Chingada home"><img src="/images/la-chingada-logo-white.png" alt="La Chingada"/></a>
          <p>Mexican street food, fresh masa and obsessive margaritas on Dundas West.</p>
          <button type="button" className="footer-reserve" onClick={openReservation}>Book a spot →</button>
        </div>
        <nav className="footer-column" aria-label="Footer navigation"><h3>Explore</h3><a href="#menu">Menu</a><a href="#specials">Weekly specials</a><a href="#agave">Agave Library</a><a href="#about">Our story</a></nav>
        <div className="footer-column"><h3>Visit</h3><a href="https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto" target="_blank" rel="noreferrer">1242 Dundas Street West<br/>Toronto, Ontario · M6J 1X5</a><a href="tel:+14165352242">416-535-2242</a><a href="mailto:reservations@lachingada.ca">reservations@lachingada.ca</a></div>
        <div className="footer-column"><h3>Follow & order</h3><a className="footer-social" href="https://www.instagram.com/la_chingada/" target="_blank" rel="noreferrer" aria-label="La Chingada Toronto on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg><span>@la_chingada</span></a><a href="https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ" target="_blank" rel="noreferrer">Order delivery →</a><a href="#visit">Hours & directions →</a></div>
      </div>
      <div className="footer-bottom"><p>© 2026 La Chingada Toronto. All rights reserved.</p><p>Dine-in specials are subject to availability. Please drink responsibly.</p><a href="#top">Back to top ↑</a></div>
    </footer>

    {openDish && <div className="modal" onClick={()=>setOpenDish(null)}><article className="dish-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setOpenDish(null)}>×</button>{openDish.image&&<img className="dish-modal-image" src={openDish.image} alt={openDish.name}/>}<div><p className="eyebrow">{openDish.group}</p>{openDish.feature&&<span className="staff-pick">{openDish.feature}</span>}<h2>{openDish.name} {openDish.spicy && <SpiceLevel level={typeof openDish.spicy === "number" ? openDish.spicy : 1}/>}</h2><strong className="modal-price">{openDish.price}</strong><div className="tags">{openDish.tags?.map(t=><i className={`tag-${t.toLowerCase()}`} key={t}>{t}</i>)}</div><p>{openDish.desc}</p><hr/><small>Dietary needs or allergies? Please speak with your server. Our kitchen handles multiple ingredients.</small></div></article></div>}
    {ageOpen && <div className="modal" onClick={()=>setAgeOpen(false)}><article onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setAgeOpen(false)}>×</button><p className="eyebrow">Agave Library · 19+</p><h2>ADULT GUESTS ONLY</h2><p>This informational collection is intended for guests of legal drinking age. It documents La Chingada’s bottles, producers, regions and agave traditions.</p><div className="age-actions"><button className="button green" onClick={()=>{setAgeOpen(false);setLibraryOpen(true)}}>Enter the library</button><button className="plain-link" onClick={()=>setAgeOpen(false)}>Go back</button></div></article></div>}
    {libraryOpen && <section className="library-overlay" aria-label="Agave Library">
      <header className="library-top"><div><p className="eyebrow">La Chingada · Collection archive</p><h2>THE AGAVE LIBRARY</h2></div><button className="library-close" onClick={()=>{setLibraryOpen(false);setOpenBottle(null)}}>Close ×</button></header>
      <div className="library-intro"><p><strong>{collectionRecords.length} bottles and house infusions</strong> from the restaurant’s current collection.</p><p>Search the archive or browse by style. Records distinguish verified bottle facts from category-level information so uncertain details are never presented as fact.</p></div>
      <div className="library-controls"><input aria-label="Search the Agave Library" placeholder="Search a bottle or producer…" value={agaveQuery} onChange={e=>setAgaveQuery(e.target.value)}/><div className="library-filters">{agaveCategories.map(category=><button key={category} className={agaveCategory===category?"active":""} onClick={()=>setAgaveCategory(category)}>{category}</button>)}</div></div>
      <div className="library-count">Showing {filteredAgave.length} collection records</div>
      <div className="bottle-grid">{filteredAgave.map(bottle=>{const archive=archiveDetails[bottle.name];return <button className={`bottle-card ${archive?.image?"has-bottle":""}`} key={bottle.id} onClick={()=>setOpenBottle(bottle)}><span className="record-number">FIELD NOTE · {String(bottle.id).padStart(3,"0")}</span>{archive?.image?<img className="bottle-thumb" src={archive.image} alt={`${bottle.name} bottle`}/>:<div className="agave-mark" aria-hidden="true">✺</div>}<h3>{bottle.name}</h3><p>{bottle.category} · {bottle.type}</p>{catalogDetails[bottle.name]&&<em>Complete Drink Bible record</em>}<b>Open record +</b></button>})}</div>
      {!filteredAgave.length && <p className="library-empty">No collection records match that search.</p>}
      {openBottle && (()=>{const facts=factsForBottle(openBottle);const a=facts.archive;const c=facts.catalog;return <div className="bottle-drawer" onClick={()=>setOpenBottle(null)}><article className={(a||c)?"rich-record":""} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setOpenBottle(null)}>×</button><span className="record-number">COLLECTION RECORD · {String(openBottle.id).padStart(3,"0")}</span><div className="record-hero">{a?.image?<img src={a.image} alt={`${openBottle.name} bottle`}/>:<div className="agave-mark large" aria-hidden="true">✺</div>}<div><p className="eyebrow">{openBottle.category} · {openBottle.type}</p><h2>{openBottle.name}</h2><div className="verification-stamp">{facts.status}</div></div></div>{c?<><div className="quick-facts"><div><span>Origin</span><strong>{c.origin||facts.region}</strong></div><div><span>ABV</span><strong>{c.abv||"Check current bottle"}</strong></div><div><span>Style</span><strong>{openBottle.category}</strong></div><div><span>Agave</span><strong>{a?.agave||facts.agave}</strong></div><div><span>Aging</span><strong>{c.aging||"Unaged / not listed"}</strong></div><div><span>NOM</span><strong>{facts.nom}</strong></div></div><div className="process"><h3>HOW IT’S MADE</h3><p className="catalog-how">{c.how}</p></div><div className="sensory-grid"><div><h3>AROMA</h3><div className="note-chips">{noteTags(c.aroma).map(x=><i key={x}>{x}</i>)}</div></div><div><h3>PROFILE</h3><div className="note-chips taste">{noteTags(c.taste).map(x=><i key={x}>{x}</i>)}</div></div></div><div className="archive-note"><strong>DID YOU KNOW?</strong><p>{c.fact}</p></div></>:a?<><div className="quick-facts"><div><span>Origin</span><strong>{facts.region}</strong></div>{a.abv&&<div><span>ABV / proof</span><strong>{a.abv}</strong></div>}<div><span>Agave</span><strong>{a.agave||facts.agave}</strong></div><div><span>NOM</span><strong>{facts.nom}</strong></div></div></>:<><p>{openBottle.note}</p><dl><div><dt>Brand / producer</dt><dd>{facts.producer}</dd></div><div><dt>Origin</dt><dd>{facts.region}</dd></div><div><dt>Agave</dt><dd>{facts.agave}</dd></div><div><dt>NOM / certification</dt><dd>{facts.nom}</dd></div><div className="wide-fact"><dt>Classification / maturation</dt><dd>{facts.production}</dd></div></dl></>}<a className="source-link" href={facts.source} target="_blank" rel="noreferrer">View current research source ↗</a><small>Informational archive for legal-age guests. Drink Bible records should be checked against the current physical bottle when labels or production details change.</small></article></div>})()}
    </section>}
    {openSpecial && specialDetails[openSpecial] && (()=>{
      const detail = specialDetails[openSpecial];
      const isHappy = openSpecial === "happy" || openSpecial === "Wednesday";
      const isAyce = openSpecial === "ayce" || openSpecial === "Thursday";
      const isMenuOffer = isHappy || isAyce;
      return <div className={`modal special-modal ${isHappy ? "happy-modal" : isAyce ? "ayce-modal" : ""}`} onClick={()=>setOpenSpecial(null)}>
        <article className={isMenuOffer ? `menu-special-record special-record-v2 ${isHappy ? "happy-record" : "ayce-record"}` : ""} onClick={event=>event.stopPropagation()}>
          <button className="close" aria-label="Close special details" onClick={()=>setOpenSpecial(null)}>×</button>
          {isHappy && <>
            <header className="special-intro promo-intro happy-intro">
              <p className="eyebrow">{detail.kicker}</p>
              <h2>{detail.title}</h2>
              <p>{detail.body}</p>
              <div className="promo-price happy-price"><span>ALL 12 FOOD ITEMS</span><strong>$6</strong><em>EACH</em></div>
            </header>
            <section className="promo-menu-panel happy-menu-panel">
              <div className="promo-panel-title"><span>THE $6 FOOD LINEUP</span><p>No tiny portions. No sad compromise.</p></div>
              <div className="happy-group-grid">{happyHourGroups.map(group=><article className="happy-food-group" key={group.title}><div><h3>{group.title}</h3><p>{group.note}</p></div><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>
            </section>
            <section className="special-drinks promo-offers" aria-label="Happy Hour drink offers">{happyHourDrinks.map((drink,index)=><div key={drink}><span>{["◒","↘","●","◇"][index]}</span><strong>{drink}</strong></div>)}</section>
          </>}
          {isAyce && <>
            <header className="special-intro promo-intro ayce-intro">
              <p className="eyebrow">{detail.kicker}</p>
              <h2>{detail.title}</h2>
              <p>{detail.body}</p>
              <div className="promo-price ayce-price"><strong>$29.95</strong><span>PER PERSON</span><em>ONE GLORIOUS HOUR</em></div>
            </header>
            <section className="promo-menu-panel ayce-menu-panel">
              <div className="promo-panel-title"><span>CHOOSE YOUR TACOS</span><p>14 proper tacos. First round: pick three.</p></div>
              <ul className="ayce-taco-grid">{ayceTacos.map((taco,index)=><li key={taco}><span>{String(index+1).padStart(2,"0")}</span><strong>{taco}</strong></li>)}</ul>
            </section>
            <section className="rule-card-grid" aria-label="How All You Can Eat Tacos works">
              {ayceRules.map((rule,index)=><article className={`rule-card rule-card-${index+1}`} key={rule}><RuleGraphic index={index}/><div className="rule-copy"><span>{String(index+1).padStart(2,"0")}</span><strong>{rule}</strong></div></article>)}
            </section>
          </>}
          {!isMenuOffer && <header className="special-intro"><p className="eyebrow">{detail.kicker}</p><h2>{detail.title}</h2><p>{detail.body}</p></header>}
          <footer className="special-footer">
            <div className="torn-note">{detail.note}</div>
            <div className="modal-actions"><a className="button red" href="#menu" onClick={()=>setOpenSpecial(null)}>Browse the full menu</a><button type="button" className="button paper" onClick={openReservation}>Book a spot</button></div>
          </footer>
        </article>
      </div>;
    })()}
    {reservationOpen && <div className="reservation-modal" onMouseDown={event=>{if(event.target===event.currentTarget) closeReservation()}}>
      <div className="reservation-dialog" ref={reservationDialog} role="dialog" aria-modal="true" aria-labelledby="reservation-title">
        <header className="reservation-modal-header">
          <div><p className="eyebrow">LA CHINGADA · DUNDAS WEST</p><h2 id="reservation-title">BOOK A TABLE.</h2><p>Pick your party, date and time without leaving the website.</p></div>
          <div className="reservation-header-actions"><a href="tel:+14165352242">Same-day help: 416-535-2242</a><button type="button" ref={reservationCloseButton} onClick={closeReservation} aria-label="Close reservation window">Close ×</button></div>
        </header>
        <div className="reservation-frame-shell" aria-busy={!reservationLoaded}>
          {!reservationLoaded && <div className="reservation-loader"><span className="loader-sun" aria-hidden="true">✹</span><strong>CHECKING THE BOOK...</strong><p>Finding you a table and pretending we are organised.</p></div>}
          <iframe className={`reservation-frame ${reservationLoaded?"is-ready":""}`} src="https://rezzo.bodhix.io" title="Book a table at La Chingada" onLoad={()=>{setReservationLoaded(true);setReservationSlow(false)}}/>
          {reservationSlow && !reservationLoaded && <div className="reservation-slow"><strong>TAKING LONGER THAN IT SHOULD?</strong><p>The booking system may be having a moment. Call <a href="tel:+14165352242">416-535-2242</a> and we’ll sort it out.</p><button type="button" onClick={()=>{setReservationSlow(false);setReservationLoaded(false)}}>Keep trying</button></div>}
        </div>
      </div>
    </div>}
    <div className="mobile-nav"><a href="#menu">Menu</a><a href="#specials">Today</a><button type="button" onClick={openReservation}>Book</button><a href="https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ" target="_blank" rel="noreferrer">Order</a></div>
  </main>
}

"use client";

import { useMemo, useState } from "react";
import { agaveRecords, type AgaveRecord } from "./agave-data";
import { archiveDetails } from "./agave-archive";

type Dish = { name: string; price: string; desc: string; tags?: string[]; spicy?: boolean; group: string };

const dishes: Dish[] = [
  {group:"Appetizers",name:"Chips & Salsa",price:"$14",tags:["V","VG"],desc:"Corn chips with guacamole, chunky salsa, and salsa borracha."},
  {group:"Appetizers",name:"Guacamole Bowl",price:"$15",tags:["V","VG"],desc:"Corn chips with avocado, onion, jalapeño, tomato, lime, and cilantro."},
  {group:"Appetizers",name:"Chilaquiles",price:"$14",tags:["V"],desc:"Corn chips tossed in warm salsa with queso fresco, crema, pickled onions, and cilantro."},
  {group:"Appetizers",name:"Barbacoa Sliders",price:"$15",desc:"Two toasted sliders with barbacoa, cheese, Valentina mayo, red onion, and cilantro."},
  {group:"Appetizers",name:"Quesadilla",price:"$15",tags:["V"],desc:'12" flour tortilla filled with cheese and grilled crispy. Add a filling +$6.'},
  {group:"Appetizers",name:"Mexican Street Corn",price:"$11",tags:["GF","V"],desc:"Roasted corn with cilantro mayo, queso fresco, Tajín, and cilantro."},
  {group:"Appetizers",name:"Nachos",price:"$17",tags:["V"],desc:"Corn chips, beans, jalapeños, chilis, cheese sauce, scallions, crema, and cilantro. Add a topping +$6."},
  {group:"Appetizers",name:"Aguachile",price:"$23",spicy:true,desc:"Shrimp in a spicy lime-habanero marinade with cucumber and avocado. Served with tostadas."},
  {group:"Appetizers",name:"Tacos Dorados",price:"$16",desc:"Four rolled corn tortillas with braised beef, lettuce, salsa verde, salsa roja, crema, and queso fresco."},
  {group:"Appetizers",name:"Rollitos de Birria",price:"$16",desc:"Corn tortilla layered with braised beef, cheese, onions, and cilantro; grilled and served with birria jus."},
  {group:"Appetizers",name:"Mexican Potatoes",price:"$15",desc:"Cajun potatoes with chorizo, queso fresco, chilis, scallions, crema, and cilantro."},
  {group:"Appetizers",name:"Queso Fundido",price:"$14",tags:["V"],desc:"House cheese sauce served hot in a skillet with corn chips. Add chorizo +$4."},
  {group:"Tacos",name:"Barbacoa Taco",price:"$8",tags:["GF"],desc:"Braised beef, caramelized onions, white onions, and salsa roja."},
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
  {group:"Brunch",name:"Huevos Rancheros",price:"$18",tags:["GF","V"],desc:"Two fried eggs on handmade tortillas with black beans, avocado, queso fresco, ranchera sauce, and cilantro."},
  {group:"Brunch",name:"Breakfast Tacos",price:"$15",tags:["GF","V"],desc:"House-made corn tortillas, scrambled eggs, pico, guacamole, crema, avocado crema, and cilantro."},
  {group:"Brunch",name:"Mexican Toast",price:"$16",tags:["V"],desc:"Rye toast with avocado, corn salsa, queso fresco, red chilis, and cilantro."},
  {group:"Brunch",name:"French Toast",price:"$16",tags:["V"],desc:"Concha bread with whipped cream, strawberries, and icing sugar."},
  {group:"Brunch",name:"Fruit Salad",price:"$10",tags:["GF","V","VG"],desc:"Seasonal fruit salad."},
];

const specials = [
  ["MON", "Monday at La Chingada", "Ask the team what’s on"], ["TUE", "Taco Tuesday", "Any 3 tacos · $20"],
  ["WED", "Hump Day Small Bites", "Food menu all day"], ["THU", "AYCE Tacos", "$29.95 per person"],
  ["FRI", "Friday at La Chingada", "Ask the team what’s on"], ["SAT + SUN", "Brunch", "10 AM–2 PM"],
];

const specialDetails: Record<string, {title:string;kicker:string;body:string;note:string}> = {
  happy: {title:"Happy Hour Small Bites", kicker:"Every day · 4–7 PM", body:"A rotating selection of small bites from the Happy Hour food menu.", note:"Dine-in only · Ask your server for today’s available food menu."},
  ayce: {title:"All You Can Eat Tacos", kicker:"Every Thursday · $29.95 per person", body:"Choose three tacos to begin, then order them one at a time after.", note:"One-hour limit · No sharing · Conditions apply."},
  Monday: {title:"Today at La Chingada", kicker:"Monday", body:"See what is happening at the restaurant today.", note:"Dine-in only · Ask the team for today’s details."},
  Tuesday: {title:"Taco Tuesday", kicker:"Tuesday · Any 3 tacos for $20", body:"Choose any three tacos from the available Taco Tuesday selection.", note:"Dine-in only · Availability and conditions apply."},
  Wednesday: {title:"Hump Day Small Bites", kicker:"Wednesday · All day", body:"The Happy Hour food menu is available all day Wednesday.", note:"Dine-in only · Ask your server for today’s available food menu."},
  Thursday: {title:"AYCE Tacos", kicker:"Thursday · $29.95 per person", body:"All you can eat, all flavour, served one round at a time.", note:"One-hour limit · No sharing · Conditions apply."},
  Friday: {title:"Today at La Chingada", kicker:"Friday", body:"See what is happening at the restaurant today.", note:"Dine-in only · Ask the team for today’s details."},
  Saturday: {title:"Weekend Brunch", kicker:"Saturday · 10 AM–2 PM", body:"Chilaquiles, huevos, breakfast tacos and more.", note:"Available during brunch hours only."},
  Sunday: {title:"Weekend Brunch", kicker:"Sunday · 10 AM–2 PM", body:"Chilaquiles, huevos, breakfast tacos and more.", note:"Available during brunch hours only."},
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
  const region = archive?.region || (isInfused ? "Prepared in-house at La Chingada, Toronto, using an agave-spirit base" : verified?.region ||
    isMezcal ? (upper.includes("DEL MAGUEY VIDA") ? "San Luis del Río, Oaxaca, Mexico" : upper.includes("PUEBLA") ? "Puebla, Mexico" : "Mexico — denomination-specific origin varies by expression") :
    upper.includes("ESPOLON") ? "Los Altos de Jalisco, Mexico" : upper.includes("JOSE CUERVO") ? "Tequila, Jalisco, Mexico" : "Mexico — within the Tequila Denomination of Origin");
  const production = isInfused ? "House infusion; preparation time and ingredients vary by flavour" :
    bottle.category === "Blanco" ? "Blanco tequila: bottled without maturation or rested in oak for no more than two months" :
    bottle.category === "Reposado" ? "Reposado tequila: matured in oak for at least two months" :
    bottle.category === "Añejo" ? "Añejo tequila: matured in oak containers of 600 litres or less for at least one year" :
    bottle.category === "Speciality" ? (upper.includes("EXTRA AÑEJO") || upper.includes("X.A.") ? "Extra añejo tequila: matured in oak for at least three years" : upper.includes("CRISTALINO") || upper.includes("EL CIELO") || upper.includes("'70") ? "Cristalino-style expression: matured tequila filtered to remove most of its colour" : "Speciality expression; maturation or cask treatment depends on the exact label") :
    "Mezcal expression; production method and certification category vary by producer";
  const nom = isMezcal ? "Mezcal certification / producer record varies" : isInfused ? "House-prepared record" : verified?.nom || "NOM verification continuing";
  const source = verified?.source || (isMezcal ? "https://www.mezcalreviews.com/" : "https://www.agavematchmaker.com/");
  const status = archive ? "Tasting archive matched · current verification recommended" : verified ? "Region and NOM matched · classification checked" : producerNames.some(([prefix]) => upper.startsWith(prefix)) ? "Brand identified · bottle verification continuing" : "Collection label identified · bottle verification continuing";
  return {producer, region, agave:archive?.agave || agave, production, nom, source, status, archive};
}

function noteTags(value?: string) {
  return value ? value.split(/[·.]/).map(x=>x.trim()).filter(Boolean).slice(0,8) : [];
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
  const filtered = useMemo(() => dishes.filter(d => d.group === group && (filter === "ALL" || d.tags?.includes(filter)) && d.name.toLowerCase().includes(query.toLowerCase())), [group, filter, query]);
  const day = new Intl.DateTimeFormat("en-CA", {weekday:"long"}).format(new Date());
  const agaveCategories = ["All", "Blanco", "Reposado", "Añejo", "Mezcal", "Speciality", "House Infused"];
  const filteredAgave = useMemo(() => agaveRecords.filter(bottle => {
    const facts = factsForBottle(bottle);
    const haystack = [bottle.name,bottle.category,bottle.type,facts.producer,facts.region,facts.agave,facts.nom].join(" ").toLowerCase();
    return (agaveCategory === "All" || bottle.category === agaveCategory) && haystack.includes(agaveQuery.toLowerCase());
  }), [agaveCategory, agaveQuery]);

  return <main>
    <header className="topbar"><a className="brand" href="#top">LA CHINGADA<span>✦</span></a><nav><a href="#menu">Menu</a><a href="#specials">Specials</a><a href="#agave">Agave Library</a><a href="#about">Our Story</a></nav><a className="reserve small" href="mailto:reservations@lachingada.ca">Reserve</a></header>

    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">Mexican Street Food · Dundas West</p><h1>A NEW MENU<br/>HAS LANDED.</h1><p className="deck">Come hungry. Stay awhile. We saved you a seat.</p><div className="actions"><a className="button red" href="#menu">View the new menu ↓</a><a className="button paper" href="mailto:reservations@lachingada.ca">Reserve a table →</a></div><img className="hero-chingadito" src="/images/chingadito-peek.png" alt="Chingadito peeking into the La Chingada homepage"/></div>
      <div className="hero-art"><img src="/images/street-corn-hero.jpg" alt="La Chingada Mexican street corn served on a wooden board"/><div className="sunburst" aria-hidden="true">✹</div><p>GOOD FOOD.<br/>NO FUSS.</p></div>
    </section>

    <section className="poster-row" aria-label="Featured offers">
      <button className="poster poster-happy" onClick={()=>setOpenSpecial("happy")}><span>EVERY DAY · 4–7</span><h2>HAPPY HOUR<br/>SMALL BITES</h2><p>Tap for food details →</p></button>
      <button className="poster poster-ayce" onClick={()=>setOpenSpecial("ayce")}><span>EVERY THURSDAY</span><h2>AYCE<br/>TACOS</h2><p>$29.95 per person →</p></button>
      <button className="poster poster-today" onClick={()=>setOpenSpecial(day)}><i>HAPPENING TODAY</i><span>{day.toUpperCase()}</span><h2>{specialDetails[day]?.title}</h2><p>Open today’s card →</p></button>
    </section>

    <section className="menu-section patterned" id="menu"><div className="section-head"><div><p className="eyebrow">Tap around. Find your thing.</p><h2>THE MENU</h2></div><p>Use the filters, open any dish for details, and build your order before you even sit down.</p></div>
      <div className="menu-feature"><img src="/images/street-corn-hero.jpg" alt="Mexican street corn made at La Chingada"/><div><p className="eyebrow">Made here. Every morning.</p><h3>REAL FOOD.<br/>REAL WORK.</h3><p>Open a dish for ingredients, dietary information and the story behind it. More original food photography is being added selectively—never as a delivery-app grid.</p></div><img className="menu-chingadito" src="/images/chingadito-press.png" alt="Chingadito under the tortilla press"/></div>
      <div className="menu-tools"><div className="tabs">{["Appetizers","Tacos","Meals","Desserts","Brunch"].map(x=><button key={x} className={group===x?"active":""} onClick={()=>setGroup(x)}>{x}</button>)}</div><div className="filters"><input aria-label="Search menu" placeholder="Search this menu…" value={query} onChange={e=>setQuery(e.target.value)}/>{["ALL","GF","V","VG"].map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div></div>
      <div className="dish-grid">{filtered.map(d=><button className="dish" key={d.name} onClick={()=>setOpenDish(d)}><div><h3>{d.name} {d.spicy && <span title="Spicy">🌶</span>}</h3><div className="tags">{d.tags?.map(t=><i key={t}>{t}</i>)}</div></div><strong>{d.price}</strong><p>{d.desc}</p><span className="more">More details +</span></button>)}</div>
      {!filtered.length && <p className="empty">Nothing matches that filter yet.</p>}
    </section>

    <section className="specials" id="specials"><div className="section-head light"><div><p className="eyebrow">There’s always something going on</p><h2>WEEKLY<br/>SPECIALS</h2></div><p>Dine-in only. Ask the team for today’s details.</p></div><div className="special-grid">{specials.map((s,i)=><button key={s[0]} className={`special s${i}`} onClick={()=>setOpenSpecial(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][i])}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><b>Open details +</b></button>)}</div></section>

    <section className="agave" id="agave"><div><p className="eyebrow">For adult guests · 19+</p><h2>THE AGAVE<br/>LIBRARY</h2><p className="agave-copy">A field guide to the bottles behind the bar: where they come from, who makes them, which agave they use, and the stories worth knowing.</p><button className="button pink" onClick={()=>setAgeOpen(true)}>Enter the library →</button></div><div className="library-card"><span>FIELD NOTES · 001</span><div className="plant">♆</div><h3>100+ BOTTLES.<br/>A LOT OF STORIES.</h3><p>Search by region, producer, agave, and flavour profile. Informational catalogue for adults.</p></div></section>

    <section className="craft" id="about">
      <div className="craft-hero"><p className="eyebrow">The work before the welcome</p><h2>BEFORE<br/>WE OPEN.</h2><div className="craft-manifesto"><strong>YOU SEE A TACO.</strong><span>We see everything it took to make it.</span><p>Before the first guest arrives, the kitchen is already cooking, grinding, pressing, blending, infusing and preparing. We make the things most restaurants simply buy.</p></div><img className="chingadito chingadito-corn" src="/images/chingadito-corn.png" alt="Chingadito carrying a sack of corn"/></div>

      <div className="corn-journey"><div className="journey-intro"><p className="eyebrow">One tortilla. The whole story.</p><h3>FROM MEXICAN CORN<br/>TO YOUR TABLE.</h3></div><div className="journey-line" aria-hidden="true"></div>
        {[
          ["01","CORN FROM MEXICO","The story begins with the ingredient itself—not a packet of finished tortillas."],
          ["02","COOKED IN-HOUSE","The corn is prepared slowly before the restaurant opens."],
          ["03","FRESHLY GROUND","We grind it into masa in our own kitchen."],
          ["04","PRESSED BY HAND","Every tortilla is individually shaped."],
          ["05","COOKED THAT MORNING","Fresh on the grill, ready for that day’s service."],
          ["06","UNDERNEATH YOUR TACO","The part you hold began as corn that very morning."],
        ].map((step,i)=><article className={`journey-step step-${i+1}`} key={step[0]}><span>{step[0]}</span><div><h4>{step[1]}</h4><p>{step[2]}</p></div>{i===3&&<img className="chingadito chingadito-press" src="/images/chingadito-press.png" alt="Chingadito caught under a tortilla press"/>}</article>)}
        <blockquote>THAT TORTILLA STARTED<br/>AS CORN THIS MORNING.</blockquote>
      </div>

      <div className="prep-wall"><div className="prep-title"><p className="eyebrow">The things you never see</p><h3>WE MAKE THE STUFF<br/>OTHER PLACES ORDER.</h3></div><div className="prep-grid">
        <article className="prep-card orange"><strong>EVERY MORNING</strong><h4>Fresh tortillas</h4><p>Cooked, ground, pressed and made fresh for service.</p></article>
        <article className="prep-card pink"><strong>FROM SCRATCH</strong><h4>House hot sauces</h4><p>Built here from whole ingredients—not tipped from a commercial bottle.</p></article>
        <article className="prep-card green"><strong>48 HOURS → 2 WEEKS</strong><h4>Bar infusions</h4><p>Some preparations take days. Others are left to develop for weeks.</p></article>
        <article className="prep-card cream"><strong>HOURS OF PREP</strong><h4>Dehydrated garnishes</h4><p>Sliced, dried and prepared by the team.</p></article>
        <article className="prep-card yellow"><strong>OUR OWN RECIPES</strong><h4>Salts, rims and purées</h4><p>Every extra detail is created specifically for La Chingada.</p></article>
        <article className="prep-card teal"><strong>MADE FRESH</strong><h4>Aguas frescas</h4><p>Prepared in-house as part of the daily rhythm.</p></article>
      </div></div>

      <div className="about-place"><div className="place-collage"><div className="place-photo patio"><span>THE HIDDEN PATIO</span></div><div className="place-photo bar"><span>THE BAR</span></div><div className="place-photo inside"><span>INSIDE LA CHINGADA</span></div><img className="chingadito chingadito-peek" src="/images/chingadito-peek.png" alt="Chingadito peeking from behind the restaurant photographs"/></div><div className="place-copy"><p className="eyebrow">After all that work</p><h3>WE SET<br/>THE TABLE.</h3><p>La Chingada should feel like arriving at a friend’s place—if your friend made fresh tortillas every morning, had a hidden patio and refused to take shortcuts.</p><strong>MEXICAN CORN.<br/>TORONTO HANDS.<br/>MADE HERE. EVERY DAY.</strong><div className="actions"><a className="button red" href="#menu">See what we make</a><a className="button paper" href="mailto:reservations@lachingada.ca">Come experience it</a></div></div></div>
    </section>

    <section className="visit" id="visit"><div className="visit-heading"><p className="eyebrow">Come find us</p><h2>VISIT LA<br/>CHINGADA.</h2><p>Mexican street food on Dundas West, with a hidden back patio and room for walk-ins.</p><img className="visit-chingadito" src="/images/chingadito-corn.png" alt="Chingadito arriving at La Chingada"/></div><div className="visit-grid">
      <article><span>01</span><h3>Find us</h3><p>1242 Dundas Street West<br/>Toronto, Ontario</p><a href="https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto" target="_blank" rel="noreferrer">Open in Maps →</a></article>
      <article><span>02</span><h3>Get in touch</h3><p><a href="tel:+14165352242">416-535-2242</a><br/><a href="mailto:reservations@lachingada.ca">reservations@lachingada.ca</a></p><a href="https://www.instagram.com/lachingadatoronto/" target="_blank" rel="noreferrer">Instagram →</a></article>
      <article><span>03</span><h3>Reservations</h3><p>Reservations are available for groups of up to six. One table is held per booking. Walk-ins are welcome.</p><a href="mailto:reservations@lachingada.ca">Request a table →</a></article>
      <article><span>04</span><h3>The patio</h3><p>Our hidden back patio is first come, first served and weather dependent.</p><a href="tel:+14165352242">Call with questions →</a></article>
      <article><span>05</span><h3>Getting here</h3><p>The 505 Dundas streetcar serves the neighbourhood. Street parking is limited, so transit is recommended.</p></article>
      <article><span>06</span><h3>Hours & access</h3><p>Check our current listing or call before travelling. For accessibility requirements, contact the team so we can help plan your visit.</p><a href="https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto" target="_blank" rel="noreferrer">View current hours →</a></article>
    </div></section>

    <section className="qr patterned"><img className="qr-chingadito" src="/images/chingadito-peek.png" alt="Chingadito pointing toward the menu QR area"/><div className="fake-qr" aria-hidden="true">▦</div><div><p className="eyebrow">At the table?</p><h2>SCAN. EXPLORE. PICK.</h2><p>Put the QR on printed menus and table cards. Guests land straight in the interactive menu—not on a cluttered homepage.</p></div></section>

    <footer><div className="brand">LA CHINGADA<span>✦</span></div><p>1242 Dundas St West · Toronto<br/>416-535-2242 · reservations@lachingada.ca</p><p>Mexican street food, made for sharing.<br/>Dine-in specials subject to availability.</p></footer>

    {openDish && <div className="modal" onClick={()=>setOpenDish(null)}><article onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setOpenDish(null)}>×</button><p className="eyebrow">{openDish.group}</p><h2>{openDish.name}</h2><strong className="modal-price">{openDish.price}</strong><div className="tags">{openDish.tags?.map(t=><i key={t}>{t}</i>)}</div><p>{openDish.desc}</p><hr/><small>Dietary needs or allergies? Please speak with your server. Our kitchen handles multiple ingredients.</small></article></div>}
    {ageOpen && <div className="modal" onClick={()=>setAgeOpen(false)}><article onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setAgeOpen(false)}>×</button><p className="eyebrow">Agave Library · 19+</p><h2>ADULT GUESTS ONLY</h2><p>This informational collection is intended for guests of legal drinking age. It documents La Chingada’s bottles, producers, regions and agave traditions.</p><div className="age-actions"><button className="button green" onClick={()=>{setAgeOpen(false);setLibraryOpen(true)}}>Enter the library</button><button className="plain-link" onClick={()=>setAgeOpen(false)}>Go back</button></div></article></div>}
    {libraryOpen && <section className="library-overlay" aria-label="Agave Library">
      <header className="library-top"><div><p className="eyebrow">La Chingada · Collection archive</p><h2>THE AGAVE LIBRARY</h2></div><button className="library-close" onClick={()=>{setLibraryOpen(false);setOpenBottle(null)}}>Close ×</button></header>
      <div className="library-intro"><p><strong>{agaveRecords.length} bottles and house infusions</strong> from the restaurant’s current collection.</p><p>Search the archive or browse by style. Records distinguish verified bottle facts from category-level information so uncertain details are never presented as fact.</p></div>
      <div className="library-controls"><input aria-label="Search the Agave Library" placeholder="Search a bottle or producer…" value={agaveQuery} onChange={e=>setAgaveQuery(e.target.value)}/><div className="library-filters">{agaveCategories.map(category=><button key={category} className={agaveCategory===category?"active":""} onClick={()=>setAgaveCategory(category)}>{category}</button>)}</div></div>
      <div className="library-count">Showing {filteredAgave.length} collection records</div>
      <div className="bottle-grid">{filteredAgave.map(bottle=>{const archive=archiveDetails[bottle.name];return <button className={`bottle-card ${archive?.image?"has-bottle":""}`} key={bottle.id} onClick={()=>setOpenBottle(bottle)}><span className="record-number">FIELD NOTE · {String(bottle.id).padStart(3,"0")}</span>{archive?.image?<img className="bottle-thumb" src={archive.image} alt={`${bottle.name} bottle`}/>:<div className="agave-mark" aria-hidden="true">✺</div>}<h3>{bottle.name}</h3><p>{bottle.category} · {bottle.type}</p>{archive&&<em>Detailed archive record</em>}<b>Open record +</b></button>})}</div>
      {!filteredAgave.length && <p className="library-empty">No collection records match that search.</p>}
      {openBottle && (()=>{const facts=factsForBottle(openBottle);const a=facts.archive;return <div className="bottle-drawer" onClick={()=>setOpenBottle(null)}><article className={a?"rich-record":""} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setOpenBottle(null)}>×</button><span className="record-number">COLLECTION RECORD · {String(openBottle.id).padStart(3,"0")}</span><div className="record-hero">{a?.image?<img src={a.image} alt={`${openBottle.name} bottle`}/>:<div className="agave-mark large" aria-hidden="true">✺</div>}<div><p className="eyebrow">{openBottle.category} · {openBottle.type}</p><h2>{openBottle.name}</h2><div className="verification-stamp">{facts.status}</div></div></div>{a?<><div className="quick-facts"><div><span>Origin</span><strong>{facts.region}</strong></div>{a.abv&&<div><span>ABV / proof</span><strong>{a.abv}</strong></div>}<div><span>Agave</span><strong>{a.agave||facts.agave}</strong></div>{a.style&&<div><span>Style</span><strong>{a.style}</strong></div>}{a.plantAge&&<div><span>Plant age</span><strong>{a.plantAge}</strong></div>}<div><span>NOM</span><strong>{facts.nom}</strong></div></div><div className="process"><h3>FROM AGAVE TO BOTTLE</h3><div className="process-steps">{a.cooking&&<div><span>01 · Cook</span><p>{a.cooking}</p></div>}{a.extraction&&<div><span>02 · Extract</span><p>{a.extraction}</p></div>}{a.fermentation&&<div><span>03 · Ferment</span><p>{a.fermentation}</p></div>}{a.distillation&&<div><span>04 · Distill</span><p>{a.distillation}</p></div>}{a.aging&&<div><span>05 · Mature</span><p>{a.aging}</p></div>}</div></div><div className="sensory-grid"><div><h3>AROMA</h3><div className="note-chips">{noteTags(a.aroma).map(x=><i key={x}>{x}</i>)}</div></div><div><h3>PROFILE</h3><div className="note-chips taste">{noteTags(a.taste).map(x=><i key={x}>{x}</i>)}</div></div></div><div className="archive-note"><strong>ARCHIVE NOTE</strong><p>This tasting record comes from La Chingada’s August 2019 archive. Production details, ABV and current bottle specifications should be checked against the physical bottle before final publication.</p></div></>:<><p>{openBottle.note}</p><dl><div><dt>Brand / producer</dt><dd>{facts.producer}</dd></div><div><dt>Origin</dt><dd>{facts.region}</dd></div><div><dt>Agave</dt><dd>{facts.agave}</dd></div><div><dt>NOM / certification</dt><dd>{facts.nom}</dd></div><div className="wide-fact"><dt>Classification / maturation</dt><dd>{facts.production}</dd></div></dl></>}<a className="source-link" href={facts.source} target="_blank" rel="noreferrer">View current research source ↗</a><small>Informational archive for legal-age guests. Bottle facts are separated from category-level information and expanded as source records are verified.</small></article></div>})()}
    </section>}
    {openSpecial && specialDetails[openSpecial] && <div className="modal special-modal" onClick={()=>setOpenSpecial(null)}><article onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setOpenSpecial(null)}>×</button><p className="eyebrow">{specialDetails[openSpecial].kicker}</p><h2>{specialDetails[openSpecial].title}</h2><p>{specialDetails[openSpecial].body}</p><div className="torn-note">{specialDetails[openSpecial].note}</div><div className="modal-actions"><a className="button red" href="#menu" onClick={()=>setOpenSpecial(null)}>Explore the menu</a><a className="button paper" href="mailto:reservations@lachingada.ca">Reserve a table</a></div></article></div>}
    <div className="mobile-nav"><a href="#menu">Menu</a><a href="#specials">Today</a><a href="mailto:reservations@lachingada.ca">Reserve</a></div>
  </main>
}

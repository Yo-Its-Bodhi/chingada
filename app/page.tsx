"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Brand, CornMark } from "./components/Brand";
import { PhotoSlot } from "./components/PhotoSlot";
import { TacoPicker } from "./components/TacoPicker";
import { ChingadaArcade } from "./components/ChingadaArcade";
import { CraftMark } from "./components/CraftMarks";
import {
  arcadeGamesUrl,
  arcadeRequiresSignIn,
  reservationUrl,
} from "./site-config";
import {
  dishes,
  type Dish,
  happyHourFood,
  happyHourDrinks,
  ayceTacos,
  ayceRules,
  dietaryText,
} from "./menu-data";

const specials = [
  {
    day: "MON",
    title: "Margarita Monday",
    offer: "$10 margaritas",
    note: "A better start to the week.",
    detail: "Monday",
    image: "/images/menu/signature-margarita-600.webp",
    alt: "La Chingada's signature margarita with a lime garnish",
    position: "center 50%",
  },
  {
    day: "TUE",
    title: "Taco Tuesday",
    offer: "Any 3 tacos · $20",
    note: "Pick your perfect trio.",
    detail: "Tuesday",
    image: "/images/optimized/tacos-real-food-640.webp",
    alt: "La Chingada tacos on a blue patterned plate",
  },
  {
    day: "WED",
    title: "Happy Hour All Day",
    offer: "$6 food · all day",
    note: "Lunch plans. Dinner plans. Sorted.",
    detail: "Wednesday",
    image: "/images/optimized/hh-guacamole-600.webp",
    alt: "Fresh guacamole and corn chips at La Chingada",
  },
  {
    day: "THU",
    title: "AYCE Tacos",
    offer: "$29.95 · one hour",
    note: "Fourteen tacos. Bring an appetite.",
    detail: "Thursday",
    image: "/images/food/tacos-serape-640.webp",
    alt: "Three La Chingada tacos with fresh toppings on a colourful Mexican textile",
  },
  {
    day: "FRI",
    title: "$6 Bar Rail",
    offer: "$6 bar rail",
    note: "Clock out. Pull up.",
    detail: "Friday",
    image: "/images/venue/neon-dining-room-640.webp",
    alt: "La Chingada's dining room glowing with colourful neon light",
  },
  {
    day: "SAT + SUN",
    title: "Brunch",
    offer: "COMING SOON",
    note: "Your weekends are about to get better.",
    detail: "Saturday",
    image: undefined,
    alt: "",
    shot: "The brunch spread",
  },
];

const photoMenuGroups = new Set([
  "Tacos",
  "Appetizers",
  "Meals",
  "Desserts",
  "Brunch",
]);

type SpecialDetail = {
  title: string;
  kicker: string;
  body: string;
  note: string;
  items?: string[];
  rules?: string[];
  drinks?: string[];
};

const happyHourGroups = [
  {
    title: "CHIPS & DIPS",
    note: "Cold drinks need company.",
    items: ["Chips & guac", "Chips & queso", "Chips & salsa"],
  },
  {
    title: "TACOS",
    note: "Same taco. Same size. Better price.",
    items: [
      "Mushroom taco",
      "Blackened fish taco",
      "Fried chicken taco",
      "Carnitas taco",
    ],
  },
  {
    title: "MORE GOOD STUFF",
    note: "For people pretending they came for one drink.",
    items: [
      "Cheese quesadilla",
      "Empanada — chorizo or chicken & cheese",
      "Esquites",
      "Ceviche tostada",
      "Buñuelos",
    ],
  },
];

const specialDetails: Record<string, SpecialDetail> = {
  happy: {
    title: "Happy Hour",
    kicker: "Every damn day · 4–7 PM",
    body: "All twelve Happy Hour food items are $6 each. Same food. Same portions. A much better reason to leave work on time.",
    items: happyHourFood,
    drinks: happyHourDrinks,
    note: "Wednesday keeps the complete $6 food lineup going all day. Dine-in only. Welcome to La Chingada.",
  },
  ayce: {
    title: "All You Can Eat Tacos",
    kicker: "Every Thursday · $29.95 per person",
    body: "Fourteen proper tacos. One glorious hour. Come hungry and choose irresponsibly well.",
    items: ayceTacos,
    rules: ayceRules,
    note: "Ask your server about dietary needs and current conditions before ordering.",
  },
  Monday: {
    title: "Margarita Monday",
    kicker: "Monday · all margaritas $10",
    body: "House margaritas. Ten bucks each. A much better start to the week.",
    note: "Dine-in only · Current selection and availability apply.",
  },
  Tuesday: {
    title: "Taco Tuesday",
    kicker: "Tuesday · any 3 tacos for $20",
    body: "Build a responsible trio—or choose entirely based on vibes. We support both methods.",
    note: "Dine-in only · Available taco selection and conditions apply.",
  },
  Wednesday: {
    title: "Happy Hour All Day",
    kicker: "Wednesday · all damn day",
    body: "All twelve Happy Hour food items are $6 each from open to close. Time is merely a suggestion.",
    items: happyHourFood,
    drinks: happyHourDrinks,
    note: "All twelve $6 food items run all day. Happy Hour drink offers run 4–7 PM. Dine-in only; availability applies.",
  },
  Thursday: {
    title: "AYCE Tacos",
    kicker: "Thursday · $29.95 per person",
    body: "Fourteen tacos. One hour. Stretch first.",
    items: ayceTacos,
    rules: ayceRules,
    note: "Ask your server about dietary needs and current conditions before ordering.",
  },
  Friday: {
    title: "Friday Bar Rail",
    kicker: "Friday · $6 bar rail",
    body: "Vodka, tequila, gin, rum or rye—with a mixer or as a shot. Friday understood the assignment.",
    note: "Dine-in only · Responsible service and availability apply.",
  },
  Saturday: {
    title: "Weekend Brunch · Coming Soon",
    kicker: "Saturday · coming soon · 10 AM–2 PM",
    body: "We’re close. Weekend brunch is nearly ready — proper La Chingada breakfast food, without suddenly becoming sensible.",
    note: "Coming soon. We’ll announce the launch date as soon as the kitchen is ready.",
  },
  Sunday: {
    title: "Weekend Brunch · Coming Soon",
    kicker: "Sunday · coming soon · 10 AM–2 PM",
    body: "We’re close. Weekend brunch is nearly ready — proper La Chingada breakfast food, without suddenly becoming sensible.",
    note: "Coming soon. We’ll announce the launch date as soon as the kitchen is ready.",
  },
};

const weeklyHours: Record<string, [number, number]> = {
  Sunday: [12, 21],
  Monday: [16, 22],
  Tuesday: [16, 22],
  Wednesday: [16, 22],
  Thursday: [12, 23],
  Friday: [12, 23],
  Saturday: [12, 23],
};
function torontoStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value || "";
  const day = value("weekday");
  const minutes = Number(value("hour")) * 60 + Number(value("minute"));
  const [open, close] = weeklyHours[day] || [0, 0];
  const fmt = (hour: number) =>
    hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`;
  if (
    minutes >= 16 * 60 &&
    minutes < 19 * 60 &&
    minutes >= open * 60 &&
    minutes < close * 60
  )
    return {
      day,
      label: "HAPPY HOUR IS ON",
      detail: "UNTIL 7 PM",
      state: "happy",
    };
  if (minutes >= open * 60 && minutes < close * 60)
    return {
      day,
      label: "OPEN NOW",
      detail: `UNTIL ${fmt(close)}`,
      state: "open",
    };
  return {
    day,
    label: "CLOSED",
    detail: minutes < open * 60 ? `BACK AT ${fmt(open)}` : "SEE YOU TOMORROW",
    state: "closed",
  };
}

function SpiceLevel({ level }: { level: number }) {
  const count = Math.max(1, Math.min(3, level));
  return (
    <span
      className="spice-level"
      aria-label={`${count} chilli${count === 1 ? "" : "s"} spicy`}
      title={`${count}/3 heat`}
    >
      {Array.from({ length: count }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path
            className="chilli-body"
            d="M4.5 15.5c2.1-4 5.2-5.2 8.2-5.2 4.2 0 6.2-2.3 6.9-6.3 2.5 7.2-.8 14.3-7.4 15.7-3.7.8-6.7-.9-7.7-4.2Z"
          />
          <path className="chilli-stem" d="M18.8 7.7c-.2-2.3 1-4 3-4.8" />
        </svg>
      ))}
    </span>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [group, setGroup] = useState("Tacos");
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const [openSpecial, setOpenSpecial] = useState<string | null>(null);
  const [day, setDay] = useState("");
  const [liveStatus, setLiveStatus] = useState({
    day: "",
    label: "CHECK TODAY’S HOURS",
    detail: "TORONTO TIME",
    state: "closed",
  });
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationLoaded, setReservationLoaded] = useState(false);
  const [reservationSlow, setReservationSlow] = useState(false);
  const [reservationAttempt, setReservationAttempt] = useState(0);
  const reservationOpener = useRef<HTMLElement | null>(null);
  const detailsOpener = useRef<HTMLElement | null>(null);
  const reservationDialog = useRef<HTMLDivElement | null>(null);
  const reservationCloseButton = useRef<HTMLButtonElement | null>(null);

  const showDish = (dish: Dish) => {
    detailsOpener.current = document.activeElement as HTMLElement | null;
    setOpenDish(dish);
  };
  const showSpecial = (special: string) => {
    detailsOpener.current = document.activeElement as HTMLElement | null;
    setOpenSpecial(special);
  };

  const openReservation = (event: ReactMouseEvent<HTMLElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    const requestedOpener = event.currentTarget;
    reservationOpener.current = requestedOpener.closest(".mobile-menu")
      ? document.querySelector<HTMLElement>(".nav-toggle")
      : requestedOpener.closest('[role="dialog"]') &&
          detailsOpener.current?.isConnected
        ? detailsOpener.current
        : requestedOpener;
    setOpenSpecial(null);
    setOpenDish(null);
    setReservationLoaded(false);
    setReservationSlow(false);
    setReservationOpen(true);
  };

  const closeReservation = () => {
    setReservationOpen(false);
    setReservationSlow(false);
    window.requestAnimationFrame(() => reservationOpener.current?.focus());
  };

  const retryReservation = () => {
    setReservationSlow(false);
    setReservationLoaded(false);
    setReservationAttempt((value) => value + 1);
  };

  const filtered = useMemo(
    () =>
      dishes
        .filter(
          (d) =>
            d.group === group &&
            (filter === "ALL" || d.tags?.includes(filter)) &&
            `${d.name} ${d.desc}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image))),
    [group, filter, query],
  );
  const previewMenu =
    photoMenuGroups.has(group) &&
    !menuExpanded &&
    !query.trim() &&
    filter === "ALL";
  const visibleDishes = previewMenu ? filtered.slice(0, 6) : filtered;
  useEffect(() => {
    let cancelled = false;
    const update = async () => {
      let now = new Date();
      try {
        const response = await fetch("/", {
          method: "HEAD",
          cache: "no-store",
        });
        const serverDate = response.headers.get("date");
        if (serverDate) now = new Date(serverDate);
      } catch {}
      if (cancelled) return;
      const status = torontoStatus(now);
      setDay(status.day);
      setLiveStatus(status);
    };
    void update();
    const timer = setInterval(() => void update(), 60000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (!reservationOpen) return;
    const focusTimer = window.setTimeout(
      () => reservationCloseButton.current?.focus(),
      0,
    );
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setReservationOpen(false);
        window.requestAnimationFrame(() => reservationOpener.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !reservationDialog.current) return;
      const focusable = Array.from(
        reservationDialog.current.querySelectorAll<HTMLElement>(
          'button,[href],iframe,input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getClientRects().length > 0,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [reservationOpen]);
  useEffect(() => {
    if (!reservationOpen || reservationLoaded) return;
    const timer = window.setTimeout(() => setReservationSlow(true), 10000);
    return () => window.clearTimeout(timer);
  }, [reservationOpen, reservationLoaded]);

  // Every overlay owns focus; the page beneath it is removed from interaction.
  useEffect(() => {
    const isOpen = Boolean(openDish || openSpecial || reservationOpen);
    const shell = document.querySelector<HTMLElement>(".site-shell");
    const mobile = document.querySelector<HTMLElement>(".mobile-nav");
    if (shell) shell.inert = isOpen;
    if (mobile) mobile.inert = isOpen;
    const previousOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      if (shell) shell.inert = false;
      if (mobile) mobile.inert = false;
      document.body.style.overflow = previousOverflow;
    };
  }, [openDish, openSpecial, reservationOpen]);

  useEffect(() => {
    if (reservationOpen || !(openDish || openSpecial)) return;
    const opener = detailsOpener.current;
    const dialogs = document.querySelectorAll<HTMLElement>('[role="dialog"]');
    const dialog = dialogs[dialogs.length - 1];
    if (!dialog) return;
    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0,
      );
    const frame = window.requestAnimationFrame(() =>
      (getFocusable()[0] || dialog).focus(),
    );
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (openSpecial) setOpenSpecial(null);
        else if (openDish) setOpenDish(null);
      }
      if (event.key === "Tab") {
        const items = getFocusable();
        const first = items[0],
          last = items[items.length - 1];
        if (!first) {
          event.preventDefault();
          dialog.focus();
          return;
        }
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !dialog.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !dialog.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      if (opener?.isConnected) opener.focus();
    };
  }, [openDish, openSpecial, reservationOpen]);

  return (
    <div id="top">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="site-shell">
        <div className="announcement">
          <span>MEXICAN CORN. TORONTO HANDS. MADE HERE, EVERY DAY.</span>
          <a href="/happy-hour">
            Happy Hour · Every day, 4–7 PM <span aria-hidden="true">↗</span>
          </a>
        </div>
        <header className="topbar">
          <a href="#top" aria-label="La Chingada home">
            <Brand />
          </a>
          <nav className="primary-nav" aria-label="Primary navigation">
            <a href="#menu">The menu</a>
            <a href="#about">Our roots</a>
            <a href="#specials">Good times</a>
            <a href="#arcade">Arcade</a>
            <a href="/agave">Agave Library</a>
            <a href="#visit">Find us</a>
          </nav>
          <a
            href={reservationUrl}
            className="button red nav-book"
            onClick={openReservation}
          >
            Book a table <span aria-hidden="true">↗</span>
          </a>
          <button
            className="nav-toggle"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            aria-controls="mobile-menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? "Close −" : "Menu +"}
          </button>
        </header>
        {navOpen && (
          <nav
            className="mobile-menu"
            id="mobile-menu"
            aria-label="Expanded navigation"
          >
            {[
              ["The menu", "#menu"],
              ["Our roots", "#about"],
              ["Good times", "#specials"],
              ["Arcade", "#arcade"],
              ["Agave Library", "/agave"],
              ["Find us", "#visit"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setNavOpen(false)}>
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
            <button
              className="button red"
              onClick={(event) => {
                setNavOpen(false);
                openReservation(event);
              }}
            >
              Book a table ↗
            </button>
          </nav>
        )}

        <main id="content" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="small-sun" aria-hidden="true">
                  ✳
                </span>{" "}
                MEXICAN STREET FOOD · DUNDAS WEST
              </p>
              <h1 id="hero-title">
                MEXICAN SOUL.
                <br />
                TORONTO
                <br />
                ATTITUDE.
              </h1>
              <p className="deck">
                Corn from Mexico. Tortillas made here every morning. Tacos and
                margaritas worth giving a damn about.
              </p>
              <div className="actions">
                <a className="button red" href="#menu">
                  Explore the menu <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={reservationUrl}
                  className="text-link"
                  onClick={openReservation}
                >
                  Pull up a chair <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-foot">
                <span>1242 DUNDAS ST. WEST · TORONTO</span>
                <a href="#about">
                  The work behind your taco <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <figure className="hero-art">
              <img
                src="/images/food/shrimp-taco-960.webp"
                srcSet="/images/food/shrimp-taco-640.webp 640w, /images/food/shrimp-taco-960.webp 960w, /images/food/shrimp-taco-1440.webp 1440w"
                sizes="(max-width: 760px) 100vw, 55vw"
                width="1848"
                height="4000"
                alt="La Chingada grilled shrimp taco with slaw, jalapeño and pink pickled onions on a dark corn tortilla"
                fetchPriority="high"
              />
              <div
                className="corn-seal"
                aria-label="Mexican corn, fresh masa daily"
              >
                <CornMark />
                <span>MEXICAN CORN</span>
                <strong>
                  FRESH MASA
                  <br />
                  DAILY
                </strong>
              </div>
              <figcaption>
                <span>NO SHORTCUTS. JUST REALLY GOOD TACOS.</span>
                <span>HECHO CON GANAS.</span>
              </figcaption>
            </figure>
          </section>

          <section className="offer-band" aria-label="Make a night of it">
            <a href="/happy-hour">
              <span className="eyebrow">EVERY DAY · 4–7 PM</span>
              <strong>HAPPY HOUR</strong>
              <span>$6 food. $10 margaritas.</span>
              <i aria-hidden="true">↗</i>
            </a>
            <a href="/all-you-can-eat-tacos">
              <span className="eyebrow">EVERY THURSDAY</span>
              <strong>ALL YOU CAN EAT</strong>
              <span>14 tacos. $29.95. One glorious hour.</span>
              <i aria-hidden="true">↗</i>
            </a>
            <a href="/patio">
              <span className="eyebrow">A LITTLE DUNDAS WEST SECRET</span>
              <strong>THE BACK PATIO</strong>
              <span>Good company. One more round.</span>
              <i aria-hidden="true">↗</i>
            </a>
          </section>

          <section
            className="roots section-pad"
            id="about"
            aria-labelledby="roots-title"
          >
            <div className="section-head">
              <p className="eyebrow">01 / FROM THE GROUND UP</p>
              <span>MEXICAN CORN. NO COMPROMISE.</span>
            </div>
            <div className="roots-grid">
              <div className="roots-copy">
                <h2 id="roots-title">
                  THE TORTILLA
                  <br />
                  IS THE POINT.
                </h2>
                <p className="lede">
                  Fresh isn&apos;t a slogan.
                  <br />
                  It&apos;s what we do before you get here.
                </p>
                <p>
                  Mexican corn, cooked and ground into fresh masa in our
                  kitchen. Your tortilla is pressed and grilled here. That day.
                </p>
                <a className="text-link" href="/our-story">
                  Meet the work behind the food{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <div
                  className="craft-process"
                  aria-label="Our daily tortilla process"
                >
                  {[
                    {
                      kind: "source" as const,
                      title: "MEXICAN CORN",
                      caption: "Start with the good stuff.",
                      body: "We import our corn from Mexico. The flavour starts long before the toppings.",
                    },
                    {
                      kind: "make" as const,
                      title: "MADE HERE",
                      caption: "Cook. Grind. Press. Grill.",
                      body: "We cook the corn, grind fresh masa, then press and grill our tortillas in-house, every day.",
                    },
                    {
                      kind: "serve" as const,
                      title: "YOUR TACO",
                      caption: "Fresh today. Gone tonight.",
                      body: "From our kitchen to your taco. Today's tortillas, made for today's service.",
                    },
                  ].map(({ kind, title, caption, body }) => (
                    <details key={kind}>
                      <summary>
                        <CraftMark kind={kind} />
                        <strong>{title}</strong>
                        <span>{caption}</span>
                        <span className="craft-more" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <p>{body}</p>
                    </details>
                  ))}
                </div>
              </div>
              <figure className="roots-photo">
                <img
                  src="/images/craft/tortillas-on-griddle-960.webp"
                  srcSet="/images/craft/tortillas-on-griddle-640.webp 640w, /images/craft/tortillas-on-griddle-960.webp 960w, /images/craft/tortillas-on-griddle-1440.webp 1440w"
                  sizes="(max-width: 760px) 100vw, 45vw"
                  width="1457"
                  height="884"
                  loading="lazy"
                  decoding="async"
                  alt="Freshly pressed La Chingada corn tortillas cooking on the kitchen griddle"
                />
                <figcaption>
                  <span>OUR KITCHEN. OUR TORTILLAS. EVERY DAY.</span>
                  <CornMark />
                </figcaption>
              </figure>
            </div>
          </section>

          <section
            className="menu-section section-pad"
            id="menu"
            aria-labelledby="menu-title"
          >
            <div className="section-head">
              <div>
                <p className="eyebrow">02 / COME HUNGRY</p>
                <h2 id="menu-title">
                  SERIOUS TACOS.
                  <br />
                  ZERO PRETENCE.
                </h2>
              </div>
              <div className="section-aside">
                <p>
                  Tacos, street food and the drinks that belong beside them. All
                  the good stuff, right here.
                </p>
                <a className="text-link" href="/menu">
                  Full food & drink menu ↗
                </a>
              </div>
            </div>
            <TacoPicker onDishSelect={showDish} />
            <div className="menu-tools">
              <div className="tabs" aria-label="Menu categories">
                {[
                  "Tacos",
                  "Appetizers",
                  "Meals",
                  "Desserts",
                  "Margaritas",
                  "Cocktails",
                  "Beer",
                  "Wine",
                  "Non-Alcoholic",
                  "Brunch",
                ].map((x) => (
                  <button
                    key={x}
                    aria-pressed={group === x}
                    className={group === x ? "active" : ""}
                    onClick={() => {
                      setGroup(x);
                      setFilter("ALL");
                      setQuery("");
                      setMenuExpanded(false);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className="filters">
                <label className="menu-search">
                  <span aria-hidden="true">⌕</span>
                  <input
                    aria-label={`Search ${group}`}
                    placeholder={`Search ${group.toLowerCase()}…`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <div className="diet-filters" aria-label="Dietary filters">
                  {[
                    ["ALL", "All"],
                    ["GF", "Gluten free"],
                    ["V", "Vegetarian"],
                    ["VG", "Vegan"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      aria-pressed={filter === value}
                      className={filter === value ? "active" : ""}
                      onClick={() => setFilter(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {group === "Brunch" && (
              <div className="menu-notice">
                <strong>BRUNCH IS COMING.</strong>
                <p>
                  We&apos;re getting the mornings ready. This is a preview of the
                  planned menu; brunch is not being served yet.
                </p>
                <a href="/brunch">What&apos;s on the way ↗</a>
              </div>
            )}
            {(group === "Margaritas" || group === "Cocktails") && (
              <div className="menu-drink-feature">
                <PhotoSlot
                  src={
                    group === "Margaritas"
                      ? "/images/menu/signature-margarita-600.webp"
                      : "/images/menu/michelada-600.webp"
                  }
                  label={
                    group === "Margaritas"
                      ? "A signature house margarita"
                      : "Our Michelada"
                  }
                  className="menu-drink-photo"
                />
                <div>
                  <p className="eyebrow">MIXED HERE. MADE FOR ANOTHER ROUND.</p>
                  <h3>
                    {group === "Margaritas"
                      ? "LIME. SALT. A LITTLE TROUBLE."
                      : "YOUR TACO'S PLUS ONE."}
                  </h3>
                  <p>
                    House infusions, syrups, rims and garnishes. A proper drink
                    deserves the same care as the food.
                  </p>
                </div>
              </div>
            )}
            <div
              className={`dish-grid ${photoMenuGroups.has(group) ? "photo-menu" : "compact-menu"}`}
              aria-live="polite"
            >
              {visibleDishes.map((d) => (
                <button
                  className="dish"
                  key={d.name}
                  onClick={() => showDish(d)}
                >
                  {photoMenuGroups.has(group) && (
                    <PhotoSlot
                      src={d.image}
                      width={d.imageWidth}
                      height={d.imageHeight}
                      label={d.name}
                      alt={d.name}
                      className="dish-photo"
                    />
                  )}
                  <div className="dish-body">
                    <div className="dish-title">
                      <h3>
                        {d.name}
                        {d.spicy && (
                          <SpiceLevel
                            level={typeof d.spicy === "number" ? d.spicy : 1}
                          />
                        )}
                      </h3>
                      <strong>{d.price}</strong>
                    </div>
                    <p>{d.desc}</p>
                    <div className="dish-meta">
                      <span className="dietary-text">
                        {dietaryText(d.tags)}
                      </span>
                      <span className="more">
                        Details <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {photoMenuGroups.has(group) &&
              !query.trim() &&
              filter === "ALL" &&
              filtered.length > 6 && (
                <div className="menu-expand">
                  <span>
                    {menuExpanded
                      ? `All ${filtered.length}`
                      : `6 of ${filtered.length}`}{" "}
                    {group.toLowerCase()}
                  </span>
                  <button
                    className="button"
                    aria-expanded={menuExpanded}
                    onClick={() => setMenuExpanded(!menuExpanded)}
                  >
                    {menuExpanded
                      ? "Show fewer"
                      : `See all ${filtered.length} ${group.toLowerCase()}`}{" "}
                    <span aria-hidden="true">{menuExpanded ? "−" : "+"}</span>
                  </button>
                </div>
              )}
            {!filtered.length && (
              <p className="empty">
                No dishes match. Try another search or{" "}
                <button
                  onClick={() => {
                    setFilter("ALL");
                    setQuery("");
                  }}
                >
                  clear the filters
                </button>
                .
              </p>
            )}
            <p className="menu-footnote">
              Please tell your server about allergies. Prices in CAD; taxes
              extra. Menu and availability may change.
            </p>
          </section>

          <section className="bar-section" aria-labelledby="bar-title">
            <figure className="bar-photo">
              <img
                src="/images/optimized/margarita-patio-photo-960.webp"
                srcSet="/images/optimized/margarita-patio-photo-640.webp 640w, /images/optimized/margarita-patio-photo-960.webp 960w"
                sizes="(max-width: 760px) 100vw, 43vw"
                width="1023"
                height="1537"
                loading="lazy"
                decoding="async"
                alt="A La Chingada margarita with a house-made chili rim, served beside tacos on the patio"
              />
              <figcaption>HOUSE MADE. RIGHT DOWN TO THE RIM.</figcaption>
            </figure>
            <div className="bar-copy">
              <p className="eyebrow">03 / THE BAR HAS STANDARDS, TOO</p>
              <h2 id="bar-title">
                GOOD SPIRITS.
                <br />
                BAD INFLUENCE.
              </h2>
              <p className="lede">
                Eleven signature margaritas.
                <br />A lot of work before the first sip.
              </p>
              <div className="bar-craft">
                <details>
                  <summary>
                    <CraftMark kind="infuse" />
                    <strong>HOUSE INFUSIONS</strong>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>
                    House-infused tequila, rested from 48 hours to two weeks.
                    Our own triple sec. The good things take time.
                  </p>
                </details>
                <details>
                  <summary>
                    <CraftMark kind="fruit" />
                    <strong>REAL FRUIT. REAL PREP.</strong>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>
                    Real fruit, slow-made syrups and salts we dry and grind
                    ourselves. Right down to the rim.
                  </p>
                </details>
                <button onClick={() => showSpecial("happy")}>
                  <CraftMark kind="drink" />
                  <strong>$10 HAPPY HOUR MARGS</strong>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
              <button
                className="button paper"
                onClick={() => {
                  setGroup("Margaritas");
                  setFilter("ALL");
                  setQuery("");
                  document
                    .querySelector("#menu")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Find your margarita ↗
              </button>
            </div>
          </section>

          <section
            className="specials section-pad"
            id="specials"
            aria-labelledby="specials-title"
          >
            <div className="section-head">
              <div>
                <p className="eyebrow">04 / MAKE IT A REGULAR THING</p>
                <h2 id="specials-title">
                  GOOD TIMES.
                  <br />
                  ALL WEEK.
                </h2>
              </div>
              <div className="section-aside">
                <p>
                  A reason to get out, a reason to stay for another. Dine-in
                  specials, done properly.
                </p>
                <a className="text-link" href="/happy-hour">
                  Happy Hour menu & details ↗
                </a>
              </div>
            </div>
            <div className="special-grid">
              {specials.map((s) => (
                <button
                  key={s.day}
                  className={`special special-${s.detail.toLowerCase()}`}
                  onClick={() => showSpecial(s.detail)}
                >
                  <PhotoSlot
                    src={s.image}
                    alt={s.alt}
                    label={s.shot ?? s.title}
                    position={s.position}
                    className="special-photo"
                  />
                  <div className="special-copy">
                    <span className="special-day">{s.day}</span>
                    <h3>{s.title}</h3>
                    <strong className="special-offer">{s.offer}</strong>
                    <p>{s.note}</p>
                    <span className="special-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <ChingadaArcade
            gamesUrl={arcadeGamesUrl}
            requiresSignIn={arcadeRequiresSignIn}
          />

          <section
            className="agave section-pad"
            id="agave"
            aria-labelledby="agave-title"
          >
            <div>
              <p className="eyebrow">FOR THE CURIOUS · 19+</p>
              <h2 id="agave-title">
                EVERY BOTTLE
                <br />
                HAS A STORY.
              </h2>
              <p>
                More than 150 bottles, house infusions and a whole world of
                agave. Explore the producers, places and traditions behind the
                bar in our Agave Library.
              </p>
              <a className="button outline" href="/agave">
                Explore the Agave Library ↗
              </a>
            </div>
            <figure>
              <img
                src="/images/optimized/la-chingada-bar-interior-591.webp"
                width="591"
                height="1280"
                loading="lazy"
                decoding="async"
                alt="La Chingada's shelves of tequila and mezcal bottles behind the bar"
              />
              <figcaption>LA CHINGADA / THE AGAVE COLLECTION</figcaption>
            </figure>
          </section>

          <section
            className="visit section-pad"
            id="visit"
            aria-labelledby="visit-title"
          >
            <div className="section-head">
              <div>
                <p className="eyebrow">06 / YOUR TABLE&apos;S THIS WAY</p>
                <h2 id="visit-title">
                  DUNDAS WEST.
                  <br />
                  MEXICO AT HEART.
                </h2>
              </div>
              <div className="section-aside">
                <p>
                  Come for a taco. Find the hidden back patio. Make a night of
                  it.
                </p>
                <a
                  href={reservationUrl}
                  className="button red"
                  onClick={openReservation}
                >
                  Book a table ↗
                </a>
              </div>
            </div>
            <div className="venue-gallery">
              <figure>
                <a
                  href={reservationUrl}
                  onClick={openReservation}
                  className="venue-image-link"
                  aria-label="Book a table in the dining room"
                >
                  <PhotoSlot
                    src="/images/venue/neon-dining-room-960.webp"
                    width={1080}
                    height={1080}
                    srcSet="/images/venue/neon-dining-room-640.webp 640w, /images/venue/neon-dining-room-960.webp 960w, /images/venue/neon-dining-room-1080.webp 1080w"
                    sizes="(max-width: 760px) 100vw, 45vw"
                    className="venue-photo"
                    label="The dining room"
                    alt="La Chingada's colourful dining room with neon light, papel picado and wooden tables"
                  />
                  <span className="venue-image-action">
                    Book your table <span aria-hidden="true">↗</span>
                  </span>
                </a>
                <figcaption>
                  <strong>YOUR KIND OF NIGHT.</strong>
                  <span>The room on Dundas West.</span>
                </figcaption>
              </figure>
              <figure>
                <a
                  href="/patio"
                  className="venue-image-link"
                  aria-label="Explore the hidden patio"
                >
                  <PhotoSlot
                    src="/images/venue/hidden-patio-960.webp"
                    width={1280}
                    height={591}
                    srcSet="/images/venue/hidden-patio-640.webp 640w, /images/venue/hidden-patio-960.webp 960w, /images/venue/hidden-patio-1280.webp 1280w"
                    sizes="(max-width: 760px) 100vw, 45vw"
                    className="venue-photo"
                    label="The hidden back patio"
                    alt="The hidden La Chingada patio with a colourful mural, wooden tables, flowers and a timber pergola"
                  />
                  <span className="venue-image-action">
                    Explore the patio <span aria-hidden="true">↗</span>
                  </span>
                </a>
                <figcaption>
                  <strong>OUT BACK. STAY A WHILE.</strong>
                  <a href="/patio">Meet the patio ↗</a>
                </figcaption>
              </figure>
            </div>
            <div className="visit-grid">
              <div className="visit-address">
                <p className="eyebrow">COME FIND US</p>
                <h3>
                  1242 DUNDAS
                  <br />
                  STREET WEST
                </h3>
                <p>Toronto, Ontario · M6J 1X5</p>
                <a
                  className="text-link"
                  href="https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions ↗
                </a>
                <div className="visit-contact">
                  <a href="tel:+14165352242">416-535-2242</a>
                  <a href="mailto:reservations@lachingada.ca">
                    reservations@lachingada.ca
                  </a>
                </div>
              </div>
              <div className="visit-hours">
                <div className="visit-hours-head">
                  <h3>OPENING HOURS</h3>
                  <span className={`live-status ${liveStatus.state}`}>
                    {liveStatus.label}
                  </span>
                </div>
                <ul>
                  {Object.entries(weeklyHours).map(([name, [open, close]]) => (
                    <li
                      className={day === name ? "today-hours" : ""}
                      key={name}
                    >
                      <span>{name}</span>
                      <strong>
                        {open > 12 ? open - 12 : open} PM – {close - 12} PM
                      </strong>
                    </li>
                  ))}
                </ul>
                <small>Toronto time. Holiday hours may vary.</small>
              </div>
              <div className="visit-details">
                <h3>A FEW GOOD THINGS TO KNOW</h3>
                <p>
                  Reservations for groups of up to six. Walk-ins welcome when
                  service allows.
                </p>
                <p>
                  The hidden patio is first come, first served and weather
                  dependent.
                </p>
                <p>Take the 505 Dundas streetcar. Street parking is limited.</p>
                <a className="text-link" href="/patio">
                  Get to know the patio ↗
                </a>
              </div>
            </div>
          </section>

          <section className="reservation-cta" id="reserve">
            <CornMark />
            <div>
              <p className="eyebrow">COME AS YOU ARE. COME HUNGRY.</p>
              <h2>WE&apos;LL SAVE YOU A SEAT.</h2>
            </div>
            <a
              href={reservationUrl}
              className="button paper"
              onClick={openReservation}
            >
              Book a table ↗
            </a>
          </section>
        </main>
        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-brand-block">
              <a href="#top" aria-label="La Chingada home">
                <Brand />
              </a>
              <p>
                Serious tacos. Questionable behaviour.
                <br />
                Made with Mexican corn and Toronto heart.
              </p>
            </div>
            <nav className="footer-column" aria-label="Explore La Chingada">
              <h3>THE GOOD STUFF</h3>
              <a href="/menu">Food & drinks</a>
              <a href="/happy-hour">Happy Hour</a>
              <a href="/all-you-can-eat-tacos">All you can eat tacos</a>
              <a href="/brunch">Brunch · coming soon</a>
              <a href="/arcade">Chingada Arcade</a>
              <a href="/agave">Agave Library · 19+</a>
            </nav>
            <nav className="footer-column" aria-label="Visit La Chingada">
              <h3>COME THROUGH</h3>
              <a href="/our-story">Our story</a>
              <a href="/patio">The back patio</a>
              <a href="#visit">Hours & directions</a>
              <a
                href="https://www.instagram.com/la_chingada/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram ↗
              </a>
            </nav>
            <div className="footer-column">
              <h3>TAKE US HOME</h3>
              <p>Same kitchen. Your couch.</p>
              <a
                className="text-link"
                href="https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ"
                target="_blank"
                rel="noreferrer"
              >
                Order delivery ↗
              </a>
              <a href="tel:+14165352242">416-535-2242</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getUTCFullYear()} LA CHINGADA TORONTO</span>
            <span>1242 DUNDAS ST. W · ALL ATTITUDE, NO SHORTCUTS.</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </div>

      {openDish && (
        <div className="modal" onClick={() => setOpenDish(null)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-label={openDish.name}
            tabIndex={-1}
            className="dish-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              aria-label="Close details"
              onClick={() => setOpenDish(null)}
            >
              ×
            </button>
            {(photoMenuGroups.has(openDish.group) || openDish.image) && (
              <PhotoSlot
                src={openDish.image}
                width={openDish.imageWidth}
                height={openDish.imageHeight}
                label={openDish.name}
                alt={openDish.name}
                className="dish-modal-image"
              />
            )}
            <div>
              <p className="eyebrow">{openDish.group}</p>
              {openDish.feature && (
                <span className="staff-pick">{openDish.feature}</span>
              )}
              <h2>
                {openDish.name}{" "}
                {openDish.spicy && (
                  <SpiceLevel
                    level={
                      typeof openDish.spicy === "number" ? openDish.spicy : 1
                    }
                  />
                )}
              </h2>
              <strong className="modal-price">{openDish.price}</strong>
              <p className="dietary-text">{dietaryText(openDish.tags)}</p>
              <p>{openDish.desc}</p>
              <hr />
              <small>
                Dietary needs or allergies? Please speak with your server. Our
                kitchen handles multiple ingredients.
              </small>
            </div>
          </article>
        </div>
      )}
      {openSpecial &&
        specialDetails[openSpecial] &&
        (() => {
          const detail = specialDetails[openSpecial];
          const isHappy =
            openSpecial === "happy" || openSpecial === "Wednesday";
          const isAyce = openSpecial === "ayce" || openSpecial === "Thursday";
          const isMenuOffer = isHappy || isAyce;
          return (
            <div
              className={`modal special-modal ${isHappy ? "happy-modal" : isAyce ? "ayce-modal" : ""}`}
              onClick={() => setOpenSpecial(null)}
            >
              <article
                role="dialog"
                aria-modal="true"
                aria-label={detail.title}
                tabIndex={-1}
                className={
                  isMenuOffer
                    ? `menu-special-record special-record-v2 ${isHappy ? "happy-record" : "ayce-record"}`
                    : ""
                }
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="close"
                  aria-label="Close special details"
                  onClick={() => setOpenSpecial(null)}
                >
                  ×
                </button>
                {isHappy && (
                  <>
                    <header className="special-intro promo-intro happy-intro">
                      <p className="eyebrow">{detail.kicker}</p>
                      <h2>{detail.title}</h2>
                      <p>{detail.body}</p>
                      <div className="promo-price happy-price">
                        <span>ALL 12 FOOD ITEMS</span>
                        <strong>$6</strong>
                        <em>EACH</em>
                      </div>
                    </header>
                    <section className="promo-menu-panel happy-menu-panel">
                      <div className="promo-panel-title">
                        <span>THE $6 FOOD LINEUP</span>
                        <p>No tiny portions. No sad compromise.</p>
                      </div>
                      <div className="happy-group-grid">
                        {happyHourGroups.map((group) => (
                          <article
                            className="happy-food-group"
                            key={group.title}
                          >
                            <div>
                              <h3>{group.title}</h3>
                              <p>{group.note}</p>
                            </div>
                            <ul>
                              {group.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </section>
                    <section
                      className="special-drinks promo-offers"
                      aria-label="Happy Hour drink offers"
                    >
                      <p className="promo-offers-heading">Drink offers · 4–7 PM</p>
                      {happyHourDrinks.map((drink, index) => (
                        <div key={drink}>
                          <span>{["◒", "↘", "●", "◇"][index]}</span>
                          <strong>{drink}</strong>
                        </div>
                      ))}
                    </section>
                  </>
                )}
                {isAyce && (
                  <>
                    <header className="special-intro promo-intro ayce-intro">
                      <p className="eyebrow">{detail.kicker}</p>
                      <h2>{detail.title}</h2>
                      <p>{detail.body}</p>
                      <div className="promo-price ayce-price">
                        <strong>$29.95</strong>
                        <span>PER PERSON</span>
                        <em>ONE GLORIOUS HOUR</em>
                      </div>
                    </header>
                    <section className="promo-menu-panel ayce-menu-panel">
                      <div className="promo-panel-title">
                        <span>CHOOSE YOUR TACOS</span>
                        <p>14 proper tacos. First round: pick three.</p>
                      </div>
                      <ul className="ayce-taco-grid">
                        {ayceTacos.map((taco, index) => (
                          <li key={taco}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{taco}</strong>
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section
                      className="rule-card-grid"
                      aria-label="How All You Can Eat Tacos works"
                    >
                      {ayceRules.map((rule, index) => (
                        <article
                          className={`rule-card rule-card-${index + 1}`}
                          key={rule}
                        >
                          <div className="rule-copy">
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{rule}</strong>
                          </div>
                        </article>
                      ))}
                    </section>
                  </>
                )}
                {!isMenuOffer && (
                  <header className="special-intro">
                    <p className="eyebrow">{detail.kicker}</p>
                    <h2>{detail.title}</h2>
                    <p>{detail.body}</p>
                  </header>
                )}
                <footer className="special-footer">
                  <div className="torn-note">{detail.note}</div>
                  <div className="modal-actions">
                    <a
                      className="button red"
                      href="/menu"
                      onClick={() => setOpenSpecial(null)}
                    >
                      Browse the full menu
                    </a>
                    <a
                      href={reservationUrl}
                      className="button paper"
                      onClick={openReservation}
                    >
                      Book a spot
                    </a>
                  </div>
                </footer>
              </article>
            </div>
          );
        })()}
      {reservationOpen && (
        <div
          className="reservation-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeReservation();
          }}
        >
          <div
            className="reservation-dialog"
            ref={reservationDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
          >
            <header className="reservation-modal-header">
              <div>
                <p className="eyebrow">LA CHINGADA · DUNDAS WEST</p>
                <h2 id="reservation-title">BOOK A TABLE.</h2>
                <p>
                  Pick your party, date and time without leaving the website.
                </p>
              </div>
              <div className="reservation-header-actions">
                <a href="tel:+14165352242">Same-day help: 416-535-2242</a>
                <a href={reservationUrl} target="_blank" rel="noreferrer">
                  Open booking in a new tab ↗
                </a>
                <button
                  type="button"
                  ref={reservationCloseButton}
                  onClick={closeReservation}
                  aria-label="Close reservation window"
                >
                  Close ×
                </button>
              </div>
            </header>
            <div
              className="reservation-frame-shell"
              aria-busy={!reservationLoaded}
            >
              {!reservationLoaded && (
                <div className="reservation-loader">
                  <span className="loader-sun" aria-hidden="true">
                    ✹
                  </span>
                  <strong>CHECKING THE BOOK...</strong>
                  <p>
                    Loading the booking system. Your next good night starts
                    here.
                  </p>
                </div>
              )}
              <iframe
                key={reservationAttempt}
                className={`reservation-frame ${reservationLoaded ? "is-ready" : ""}`}
                src={reservationUrl}
                title="Book a table at La Chingada"
                onLoad={() => {
                  setReservationLoaded(true);
                  setReservationSlow(false);
                }}
              />
              {reservationSlow && !reservationLoaded && (
                <div className="reservation-slow">
                  <strong>TAKING LONGER THAN IT SHOULD?</strong>
                  <p>
                    The booking system is taking longer to load. Call{" "}
                    <a href="tel:+14165352242">416-535-2242</a> and we’ll sort
                    it out.
                  </p>
                  <button
                    type="button"
                    onClick={retryReservation}
                  >
                    Reload booking
                  </button>
                </div>
              )}
            </div>
            <div className="reservation-help">
              <span>
                Booking not showing? <a href="tel:+14165352242">Call 416-535-2242</a>
              </span>
              <button type="button" onClick={retryReservation}>Reload booking</button>
            </div>
          </div>
        </div>
      )}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#menu" className="mobile-nav-item">
          <span className="mobile-nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 6h14M5 12h14M5 18h9" />
            </svg>
          </span>
          <span className="mobile-nav-label">Menu</span>
        </a>
        <a href="#specials" className="mobile-nav-item">
          <span className="mobile-nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </span>
          <span className="mobile-nav-label">Specials</span>
        </a>
        <a
          href={reservationUrl}
          className="mobile-nav-book"
          onClick={openReservation}
        >
          <span className="mobile-nav-book-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7 4v3M17 4v3M5 9h14M6 6h12a1 1 0 0 1 1 1v12H5V7a1 1 0 0 1 1-1Z" />
              <path d="m9 14 2 2 4-5" />
            </svg>
          </span>
          <span>Book</span>
        </a>
        <a
          href="https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ"
          target="_blank"
          rel="noreferrer"
          className="mobile-nav-item"
        >
          <span className="mobile-nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6 7h12l-1 11H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
          </span>
          <span className="mobile-nav-label">Order</span>
        </a>
      </nav>
    </div>
  );
}

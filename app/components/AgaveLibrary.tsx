"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { agaveRecords, type AgaveRecord } from "../agave-data";
import { archiveDetails } from "../agave-archive";
import { catalogDetails } from "../agave-catalog";
import { houseInfusions } from "../house-infusions";
import { CornMark } from "./Brand";
import { useAgaveDialogFocus } from "./useAgaveDialogFocus";

const producerNames: Array<[string, string]> = [
  ["818", "818 Tequila"],
  ["1800", "Casa Cuervo / 1800 Tequila"],
  ["CABO WABO", "Cabo Wabo Tequila"],
  ["CASAMIGOS", "Casamigos"],
  ["CAZADORES", "Tequila Cazadores"],
  ["CINCORO", "Cincoro Tequila"],
  ["CLASE AZUL", "Clase Azul México"],
  ["CODIGO", "Código 1530"],
  ["DON JULIO", "Tequila Don Julio"],
  ["ESPOLON", "Espolòn / Casa San Nicolás"],
  ["HERRADURA", "Casa Herradura"],
  ["HORNITOS", "Hornitos / Casa Sauza"],
  ["JOSE CUERVO", "José Cuervo"],
  ["OLMECA ALTOS", "Olmeca Altos"],
  ["PATRON", "Patrón"],
  ["TEREMANA", "Teremana Tequila"],
  ["TROMBA", "Tequila Tromba"],
  ["DEL MAGUEY", "Del Maguey"],
  ["MONTELOBOS", "Montelobos Mezcal"],
  ["BANHEZ", "Bañhez Mezcal"],
  ["ILEGAL", "Ilegal Mezcal"],
  ["OJO DE TIGRE", "Ojo de Tigre Mezcal"],
  ["DOS HOMBRES", "Dos Hombres Mezcal"],
  ["EL SILENCIO", "Mezcal El Silencio"],
];

type VerifiedBrand = {
  producer: string;
  region: string;
  nom: string;
  source: string;
};
const verifiedBrands: Array<[string, VerifiedBrand]> = [
  [
    "818",
    {
      producer: "818 Tequila",
      region: "Jalisco · Los Valles",
      nom: "NOM 1607",
      source: "https://www.agavematchmaker.com/brands/2614-818-tequila",
    },
  ],
  [
    "1800",
    {
      producer: "Casa Cuervo / 1800 Tequila",
      region: "Jalisco · Los Valles",
      nom: "NOM 1122",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "CASAMIGOS",
    {
      producer: "Casamigos Tequila",
      region: "Jalisco · Ciénega",
      nom: "NOM 1609",
      source: "https://www.agavematchmaker.com/brands/1354-casamigos-tequila",
    },
  ],
  [
    "CAZADORES",
    {
      producer: "Tequila Cazadores",
      region: "Jalisco · Los Altos Southern",
      nom: "NOM 1487",
      source: "https://www.agavematchmaker.com/brands/75-cazadores",
    },
  ],
  [
    "CENOTE",
    {
      producer: "Cenote Tequila",
      region: "Jalisco · Los Valles",
      nom: "NOM 1472",
      source: "https://www.agavematchmaker.com/brands?page=15",
    },
  ],
  [
    "CINCORO",
    {
      producer: "Cincoro Tequila",
      region: "Jalisco · Los Valles",
      nom: "NOM 1438",
      source: "https://www.agavematchmaker.com/brands/2280-cincoro-tequila",
    },
  ],
  [
    "DON JULIO",
    {
      producer: "Tequila Don Julio",
      region: "Jalisco · Ciénega",
      nom: "NOM 1449",
      source: "https://www.agavematchmaker.com/brands/875-don-julio",
    },
  ],
  [
    "EL MEXICANO",
    {
      producer: "El Mexicano",
      region: "Jalisco · Los Altos Southern",
      nom: "NOM 1588",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "EL TEQUILENO",
    {
      producer: "El Tequileño",
      region: "Jalisco · Los Valles",
      nom: "NOM 1108",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "EL TESORO",
    {
      producer: "El Tesoro de Don Felipe",
      region: "Jalisco · Los Altos Southern",
      nom: "NOM 1139",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "ELEVACION 1250",
    {
      producer: "Elevación1250",
      region: "Jalisco · Los Valles",
      nom: "NOM 1522",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "ESPOLON",
    {
      producer: "Espolòn / Casa San Nicolás",
      region: "Jalisco · Los Altos Southern",
      nom: "NOM 1440",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "FLECHA AZUL",
    {
      producer: "Flecha Azul",
      region: "Jalisco · Los Valles",
      nom: "NOM 1110",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "JOSE CUERVO",
    {
      producer: "José Cuervo",
      region: "Jalisco · Los Valles",
      nom: "NOM 1122",
      source: "https://www.agavematchmaker.com/brands/128-jose-cuervo",
    },
  ],
  [
    "MALA VIDA",
    {
      producer: "Mala Vida",
      region: "Jalisco · Los Altos Southern",
      nom: "NOM 1588",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "SAUZA TRES GENERACIONES",
    {
      producer: "Casa Sauza / Tres Generaciones",
      region: "Jalisco · Los Valles",
      nom: "NOM 1102",
      source: "https://www.agavematchmaker.com/brands/982-sauza-tequila",
    },
  ],
  [
    "SIEMPRE",
    {
      producer: "Siempre Tequila",
      region: "Jalisco · Los Altos Southern",
      nom: "NOM 1414",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
  [
    "VOLCAN",
    {
      producer: "Volcan de Mi Tierra",
      region: "Jalisco · Los Valles",
      nom: "NOM 1523",
      source: "https://www.agavematchmaker.com/brands",
    },
  ],
];

function factsForBottle(bottle: AgaveRecord) {
  const upper = bottle.name.toUpperCase();
  const archive = archiveDetails[bottle.name];
  const catalog = catalogDetails[bottle.name];
  const verified = verifiedBrands.find(([prefix]) =>
    upper.startsWith(prefix),
  )?.[1];
  const producer =
    verified?.producer ||
    producerNames.find(([prefix]) => upper.startsWith(prefix))?.[1] ||
    upper.replace(/\s+(BLANCO|SILVER|PLATA|REPOSADO|AÑEJO|JOVEN).*$/, "");
  const isMezcal = bottle.type === "Mezcal";
  const isInfused = bottle.category === "House Infused";
  let agave = "Blue Weber agave (Agave tequilana Weber var. azul)";
  if (isMezcal) {
    if (upper.includes("CUPREATA")) agave = "Cupreata agave";
    else if (upper.includes("ESPADIN") && upper.includes("BARRIL"))
      agave = "Espadín and Barril agaves";
    else if (upper.includes("ESPADIN"))
      agave = "Espadín agave (Agave angustifolia)";
    else
      agave =
        "Agave variety varies by this mezcal expression; label verification required";
  }
  const region =
    archive?.region ||
    catalog?.origin ||
    verified?.region ||
    (isInfused
      ? "Prepared in-house at La Chingada, Toronto, using an agave-spirit base"
      : isMezcal
        ? upper.includes("DEL MAGUEY VIDA")
          ? "San Luis del Río, Oaxaca, Mexico"
          : upper.includes("PUEBLA")
            ? "Puebla, Mexico"
            : "Mexico — denomination-specific origin varies by expression"
        : upper.includes("ESPOLON")
          ? "Los Altos de Jalisco, Mexico"
          : upper.includes("JOSE CUERVO")
            ? "Tequila, Jalisco, Mexico"
            : "Mexico — within the Tequila Denomination of Origin");
  const production =
    catalog?.how ||
    (isInfused
      ? "House infusion; preparation time and ingredients vary by flavour"
      : bottle.category === "Blanco"
        ? "Blanco tequila: bottled without maturation or rested in oak for no more than two months"
        : bottle.category === "Reposado"
          ? "Reposado tequila: matured in oak for at least two months"
          : bottle.category === "Añejo"
            ? "Añejo tequila: matured in oak containers of 600 litres or less for at least one year"
            : bottle.category === "Speciality"
              ? upper.includes("EXTRA AÑEJO") || upper.includes("X.A.")
                ? "Extra añejo tequila: matured in oak for at least three years"
                : upper.includes("CRISTALINO") ||
                    upper.includes("EL CIELO") ||
                    upper.includes("'70")
                  ? "Cristalino-style expression: matured tequila filtered to remove most of its colour"
                  : "Speciality expression; maturation or cask treatment depends on the exact label"
              : "Mezcal expression; production method and certification category vary by producer");
  const nom = isMezcal
    ? "Mezcal certification / producer record varies"
    : isInfused
      ? "House-prepared record"
      : verified?.nom || "NOM verification continuing";
  const source =
    verified?.source ||
    (isMezcal
      ? "https://www.mezcalreviews.com/"
      : "https://www.agavematchmaker.com/");
  const status = catalog
    ? "Drink Bible record matched"
    : archive
      ? "Tasting archive matched · current verification recommended"
      : verified
        ? "Region and NOM matched · classification checked"
        : producerNames.some(([prefix]) => upper.startsWith(prefix))
          ? "Brand identified · bottle verification continuing"
          : "Collection label identified · bottle verification continuing";
  return {
    producer,
    region,
    agave: archive?.agave || agave,
    production,
    nom,
    source,
    status,
    archive,
    catalog,
  };
}

function noteTags(value?: string) {
  return value
    ? value
        .split(/[·.]/)
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 8)
    : [];
}

export default function AgaveLibrary({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [agaveQuery, setAgaveQuery] = useState("");
  const [agaveCategory, setAgaveCategory] = useState("All");
  const [openBottle, setOpenBottle] = useState<AgaveRecord | null>(null);
  const libraryDialog = useRef<HTMLElement | null>(null);
  const bottleDialog = useRef<HTMLElement | null>(null);
  const bottleOpener = useRef<HTMLElement | null>(null);

  const closeBottle = useCallback(() => setOpenBottle(null), []);
  const closeLibrary = useCallback(() => {
    bottleOpener.current = null;
    setOpenBottle(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      // The parent can close this retained archive without its close handler;
      // clear the independent bottle drawer before the next opening.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenBottle(null);
      bottleOpener.current = null;
    }
  }, [isOpen]);

  useAgaveDialogFocus(
    libraryDialog,
    isOpen && !openBottle,
    closeLibrary,
    bottleOpener,
  );
  useAgaveDialogFocus(bottleDialog, isOpen && Boolean(openBottle), closeBottle);

  const agaveCategories = [
    "All",
    "Blanco",
    "Reposado",
    "Añejo",
    "Mezcal",
    "Speciality",
    "House Infused",
  ];
  const collectionRecords = useMemo(
    () => [...agaveRecords, ...houseInfusions],
    [],
  );
  const filteredAgave = useMemo(
    () =>
      collectionRecords
        .filter((bottle) => {
          const facts = factsForBottle(bottle);
          const haystack = [
            bottle.name,
            bottle.category,
            bottle.type,
            facts.producer,
            facts.region,
            facts.agave,
            facts.nom,
          ]
            .join(" ")
            .toLowerCase();
          return (
            (agaveCategory === "All" || bottle.category === agaveCategory) &&
            haystack.includes(agaveQuery.toLowerCase())
          );
        })
        .sort(
          (a, b) =>
            Number(Boolean(archiveDetails[b.name]?.image)) -
              Number(Boolean(archiveDetails[a.name]?.image)) ||
            a.name.localeCompare(b.name),
        ),
    [agaveCategory, agaveQuery, collectionRecords],
  );

  if (!isOpen) return null;

  return (
    <section
      className="library-overlay"
      ref={libraryDialog}
      role="dialog"
      aria-modal={!openBottle}
      tabIndex={-1}
      aria-label="Agave Library"
    >
      <div className="library-content" inert={Boolean(openBottle)}>
        <header className="library-top">
          <div>
            <p className="eyebrow">La Chingada · Collection archive</p>
            <h2>THE AGAVE LIBRARY</h2>
          </div>
          <button
            className="library-close"
            onClick={closeLibrary}
            aria-label="Close the Agave Library"
          >
            Close ×
          </button>
        </header>
        <div className="library-intro">
          <p>
            <strong>
              {collectionRecords.length} bottles and house infusions
            </strong>{" "}
            from the restaurant’s current collection.
          </p>
          <p>
            Search the archive or browse by style. Records distinguish verified
            bottle facts from category-level information so uncertain details
            are never presented as fact.
          </p>
        </div>
        <div className="library-controls">
          <input
            aria-label="Search the Agave Library"
            placeholder="Search a bottle or producer…"
            value={agaveQuery}
            onChange={(e) => setAgaveQuery(e.target.value)}
          />
          <div className="library-filters">
            {agaveCategories.map((category) => (
              <button
                key={category}
                aria-pressed={agaveCategory === category}
                className={agaveCategory === category ? "active" : ""}
                onClick={() => setAgaveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="library-count" role="status" aria-live="polite">
          Showing {filteredAgave.length} collection{" "}
          {filteredAgave.length === 1 ? "record" : "records"}
        </div>
        <div className="bottle-grid">
          {filteredAgave.map((bottle) => {
            const archive = archiveDetails[bottle.name];
            return (
              <button
                className={`bottle-card ${archive?.image ? "has-bottle" : ""}`}
                key={bottle.id}
                onClick={(event) => {
                  bottleOpener.current = event.currentTarget;
                  setOpenBottle(bottle);
                }}
              >
                <span className="record-number">
                  FIELD NOTE · {String(bottle.id).padStart(3, "0")}
                </span>
                {archive?.image ? (
                  <img
                    className="bottle-thumb"
                    width="160"
                    height="200"
                    loading="lazy"
                    decoding="async"
                    src={archive.image}
                    alt={`${bottle.name} bottle`}
                  />
                ) : (
                  <div className="agave-mark" aria-hidden="true">
                    <CornMark />
                  </div>
                )}
                <h3>{bottle.name}</h3>
                <p>
                  {bottle.category} · {bottle.type}
                </p>
                {catalogDetails[bottle.name] && (
                  <em>Complete Drink Bible record</em>
                )}
                <b>Open record +</b>
              </button>
            );
          })}
        </div>
        {!filteredAgave.length && (
          <p className="library-empty">
            No collection records match that search.
          </p>
        )}
      </div>
      {openBottle &&
        (() => {
          const facts = factsForBottle(openBottle);
          const a = facts.archive;
          const c = facts.catalog;
          return (
            <div className="bottle-drawer" onClick={closeBottle}>
              <article
                role="dialog"
                ref={bottleDialog}
                aria-modal="true"
                aria-label={openBottle.name}
                tabIndex={-1}
                className={a || c ? "rich-record" : ""}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close"
                  aria-label="Close details"
                  onClick={closeBottle}
                >
                  ×
                </button>
                <span className="record-number">
                  COLLECTION RECORD · {String(openBottle.id).padStart(3, "0")}
                </span>
                <div className="record-hero">
                  {a?.image ? (
                    <img
                      src={a.image}
                      width="160"
                      height="200"
                      decoding="async"
                      alt={`${openBottle.name} bottle`}
                    />
                  ) : (
                    <div className="agave-mark large" aria-hidden="true">
                      <CornMark />
                    </div>
                  )}
                  <div>
                    <p className="eyebrow">
                      {openBottle.category} · {openBottle.type}
                    </p>
                    <h2>{openBottle.name}</h2>
                    <div className="verification-stamp">{facts.status}</div>
                  </div>
                </div>
                {c ? (
                  <>
                    <div className="quick-facts">
                      <div>
                        <span>Origin</span>
                        <strong>{c.origin || facts.region}</strong>
                      </div>
                      <div>
                        <span>ABV</span>
                        <strong>{c.abv || "Check current bottle"}</strong>
                      </div>
                      <div>
                        <span>Style</span>
                        <strong>{openBottle.category}</strong>
                      </div>
                      <div>
                        <span>Agave</span>
                        <strong>{a?.agave || facts.agave}</strong>
                      </div>
                      <div>
                        <span>Aging</span>
                        <strong>{c.aging || "Unaged / not listed"}</strong>
                      </div>
                      <div>
                        <span>NOM</span>
                        <strong>{facts.nom}</strong>
                      </div>
                    </div>
                    <div className="process">
                      <h3>HOW IT’S MADE</h3>
                      <p className="catalog-how">{c.how}</p>
                    </div>
                    <div className="sensory-grid">
                      <div>
                        <h3>AROMA</h3>
                        <div className="note-chips">
                          {noteTags(c.aroma).map((x) => (
                            <i key={x}>{x}</i>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3>PROFILE</h3>
                        <div className="note-chips taste">
                          {noteTags(c.taste).map((x) => (
                            <i key={x}>{x}</i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="archive-note">
                      <strong>DID YOU KNOW?</strong>
                      <p>{c.fact}</p>
                    </div>
                  </>
                ) : a ? (
                  <>
                    <div className="quick-facts">
                      <div>
                        <span>Origin</span>
                        <strong>{facts.region}</strong>
                      </div>
                      {a.abv && (
                        <div>
                          <span>ABV / proof</span>
                          <strong>{a.abv}</strong>
                        </div>
                      )}
                      <div>
                        <span>Agave</span>
                        <strong>{a.agave || facts.agave}</strong>
                      </div>
                      <div>
                        <span>NOM</span>
                        <strong>{facts.nom}</strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{openBottle.note}</p>
                    <dl>
                      <div>
                        <dt>Brand / producer</dt>
                        <dd>{facts.producer}</dd>
                      </div>
                      <div>
                        <dt>Origin</dt>
                        <dd>{facts.region}</dd>
                      </div>
                      <div>
                        <dt>Agave</dt>
                        <dd>{facts.agave}</dd>
                      </div>
                      <div>
                        <dt>NOM / certification</dt>
                        <dd>{facts.nom}</dd>
                      </div>
                      <div className="wide-fact">
                        <dt>Classification / maturation</dt>
                        <dd>{facts.production}</dd>
                      </div>
                    </dl>
                  </>
                )}
                <a
                  className="source-link"
                  href={facts.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  View current research source ↗
                </a>
                <small>
                  Informational archive for legal-age guests. Drink Bible
                  records should be checked against the current physical bottle
                  when labels or production details change.
                </small>
              </article>
            </div>
          );
        })()}
    </section>
  );
}

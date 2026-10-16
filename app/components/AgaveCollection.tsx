"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { agaveRecords, type AgaveRecord } from "../agave-data";
import { houseInfusions } from "../house-infusions";
import { agavePhoto, agaveResearch } from "../agave-research";
import { agavePrice, formatAgavePrice } from "../agave-prices";
import { PhotoSlot } from "./PhotoSlot";
import { AgaveBottleDetails } from "./AgaveBottleDetails";
import { useAgaveDialogFocus } from "./useAgaveDialogFocus";
import "./agave-collection.css";

// Keep house records preserved for a later release; only bottled spirits are public.
const collection = [...agaveRecords, ...houseInfusions].filter(
  (bottle) =>
    (agaveResearch.get(bottle.id)?.category ?? bottle.category) !==
    "House Infused",
);
const styles = [
  "All",
  "Blanco",
  "Reposado",
  "Añejo",
  "Mezcal",
  "Speciality",
  "Flavoured",
];
const titleFor = (bottle: AgaveRecord) =>
  agaveResearch.get(bottle.id)?.displayName ?? bottle.name;
const styleFor = (bottle: AgaveRecord) =>
  agaveResearch.get(bottle.id)?.category ?? bottle.category;
const normalized = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function BottlePhoto({
  bottle,
  large = false,
}: {
  bottle: AgaveRecord;
  large?: boolean;
}) {
  const photo = agavePhoto(bottle.id);
  return (
    <PhotoSlot
      src={photo?.localPath}
      width={photo?.width ?? 300}
      height={photo?.height ?? 450}
      label={`${titleFor(bottle)} · bottle photo`}
      alt={`${titleFor(bottle)} bottle`}
      sizes={
        large
          ? "(max-width: 650px) 50vw, 260px"
          : "(max-width: 650px) 40vw, 220px"
      }
      className={`agave-bottle-photo${large ? " agave-bottle-photo--large" : ""}`}
    />
  );
}

export function AgaveCollection() {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("All");
  const [limit, setLimit] = useState(24);
  const [openBottle, setOpenBottle] = useState<AgaveRecord | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLElement | null>(null);
  const close = useCallback(() => {
    setOpenBottle(null);
    window.requestAnimationFrame(() => opener.current?.focus());
  }, []);
  useAgaveDialogFocus(dialog, Boolean(openBottle), close);
  useEffect(() => {
    if (!openBottle) return;
    const shell = document.querySelector<HTMLElement>(".editorial-page");
    const previousInert = shell?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    if (shell) shell.inert = true;
    document.body.style.overflow = "hidden";
    return () => {
      if (shell) shell.inert = previousInert;
      document.body.style.overflow = previousOverflow;
    };
  }, [openBottle]);
  const filtered = useMemo(
    () =>
      collection
        .filter((bottle) => {
          const research = agaveResearch.get(bottle.id);
          return (
            (style === "All" || styleFor(bottle) === style) &&
            normalized(
              [
                titleFor(bottle),
                bottle.name,
                bottle.type,
                styleFor(bottle),
                ...Object.values(research?.facts ?? {}),
              ].join(" "),
            ).includes(normalized(query.trim()))
          );
        })
        .sort((a, b) => titleFor(a).localeCompare(titleFor(b))),
    [query, style],
  );
  function reset() {
    setQuery("");
    setStyle("All");
    setLimit(24);
  }
  return (
    <section
      className="agave-collection"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div className="agave-collection-heading">
        <div>
          <p className="eyebrow">Tequila, mezcal & flavoured spirits</p>
          <h2 id="collection-title">Find your next good story.</h2>
        </div>
        <div>
          <p>Choose a style. Pick a bottle. Get to know what’s inside.</p>
          <p className="agave-pricing-note">Prices in CAD · taxes extra.</p>
        </div>
      </div>
      <div className="agave-collection-tools">
        <label className="agave-search">
          <span>Search the collection</span>
          <input
            type="search"
            value={query}
            placeholder="Bottle, producer, region or agave…"
            onChange={(event) => {
              setQuery(event.target.value);
              setLimit(24);
            }}
          />
        </label>
        <div
          className="agave-style-filters"
          role="group"
          aria-label="Bottle styles"
        >
          {styles.map((item) => (
            <button
              key={item}
              aria-pressed={style === item}
              onClick={() => {
                setStyle(item);
                setLimit(24);
              }}
            >
              {item === "House Infused" ? "House infusions" : item}{" "}
              <span>
                {item === "All"
                  ? collection.length
                  : collection.filter((bottle) => styleFor(bottle) === item)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="agave-results">
        <p role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "record" : "records"}
          {query ? ` matching “${query.trim()}”` : " to explore"} · showing{" "}
          {Math.min(limit, filtered.length)}
        </p>
        {(query || style !== "All") && (
          <button onClick={reset}>
            Reset filters <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
      <div className="agave-collection-grid">
        {filtered.slice(0, limit).map((bottle) => (
          <button
            key={bottle.id}
            className="agave-collection-card"
            aria-label={`Explore ${titleFor(bottle)}, ${agavePrice(bottle.id) !== undefined ? `${formatAgavePrice(agavePrice(bottle.id)!)} CAD` : "ask at the bar for price"}`}
            data-bottle-id={bottle.id}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setOpenBottle(bottle);
            }}
          >
            <span className="agave-card-head">
              <span className="agave-card-type">{styleFor(bottle)}</span>
              <span className="agave-card-price">
                {agavePrice(bottle.id) !== undefined ? (
                  <strong>{formatAgavePrice(agavePrice(bottle.id)!)}</strong>
                ) : (
                  <span className="agave-price-pending">Ask at the bar</span>
                )}
              </span>
            </span>
            <BottlePhoto bottle={bottle} />
            <h3>{titleFor(bottle)}</h3>
            <span className="agave-card-detail">
              Explore the bottle <span aria-hidden="true">+</span>
            </span>
          </button>
        ))}
      </div>
      {!filtered.length && (
        <div className="agave-no-results">
          <h3>No bottles by that name.</h3>
          <p>Try another spelling, a producer or a different style.</p>
          <button className="button" onClick={reset}>
            Show the collection
          </button>
        </div>
      )}
      {limit < filtered.length && (
        <div className="agave-show-more">
          <button
            className="button"
            onClick={() => setLimit((value) => value + 24)}
          >
            More bottles, more stories <span aria-hidden="true">+</span>
          </button>
        </div>
      )}
      {openBottle &&
        createPortal(
          <div className="agave-record-overlay" onClick={close}>
            <article
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-label={titleFor(openBottle)}
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="close"
                aria-label="Close bottle details"
                onClick={close}
              >
                ×
              </button>
              <AgaveBottleDetails
                bottle={openBottle}
                photo={<BottlePhoto bottle={openBottle} large />}
              />
            </article>
          </div>,
          document.body,
        )}
    </section>
  );
}

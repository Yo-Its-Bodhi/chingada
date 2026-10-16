"use client";

import { useState } from "react";
import { dishes, type Dish } from "../menu-data";
import { PhotoSlot } from "./PhotoSlot";
import "./taco-picker.css";

type Craving = "slow" | "crispy" | "meat-free" | "surprise";

const tacos = dishes.filter((dish) => dish.group === "Tacos");
const choices: { id: Craving; label: string; line: string }[] = [
  {
    id: "slow",
    label: "Rich & slow-cooked",
    line: "Big fillings. Take your time with these.",
  },
  {
    id: "crispy",
    label: "Something crispy",
    line: "Crunch up front. Big flavour all the way.",
  },
  {
    id: "meat-free",
    label: "Meat-free",
    line: "Mushrooms, halloumi, sweet potato. Absolutely no consolation prizes.",
  },
  {
    id: "surprise",
    label: "Surprise me",
    line: "Three very good reasons to put your phone down when the food arrives.",
  },
];

const combinations: Record<Exclude<Craving, "surprise">, string[][]> = {
  slow: [
    ["Barbacoa Taco", "Carnitas Taco", "Pastor Taco"],
    ["Tinga de Pollo Taco", "Chingada Taco", "Carnitas Taco"],
    ["Pastor Taco", "Barbacoa Taco", "Chingada Taco"],
  ],
  crispy: [
    ["Baja Fish Taco", "Fried Chicken Taco", "Carne Asada Taco"],
    ["Fried Chicken Taco", "Chingada Taco", "Baja Fish Taco"],
  ],
  "meat-free": [["Mushroom Taco", "Halloumi Taco", "Sweet Potato Taco"]],
};

function namedTacos(names: string[]) {
  return names.flatMap((name) => {
    const dish = tacos.find((taco) => taco.name === name);
    return dish ? [dish] : [];
  });
}

function shuffleTrio(previous: Dish[]) {
  const shuffled = [...tacos];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const next = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[next]] = [shuffled[next], shuffled[index]];
  }
  const result = shuffled.slice(0, 3);
  if (result.every((dish) => previous.some((old) => old.name === dish.name))) {
    return shuffled.slice(3, 6);
  }
  return result;
}

function trioPrice(trio: Dish[]) {
  const total = trio.reduce((sum, dish) => {
    const match = dish.price.match(/^\$(\d+(?:\.\d{1,2})?)$/);
    return sum + (match ? Math.round(Number(match[1]) * 100) : 0);
  }, 0);
  return `$${(total / 100).toFixed(total % 100 ? 2 : 0)}`;
}

export function TacoPicker({
  onDishSelect,
}: {
  onDishSelect?: (dish: Dish) => void;
}) {
  // A fixed first trio keeps the server render and initial client render identical.
  const [craving, setCraving] = useState<Craving>("surprise");
  const [combination, setCombination] = useState(0);
  const [trio, setTrio] = useState(() =>
    namedTacos(["Barbacoa Taco", "Baja Fish Taco", "Sweet Potato Taco"]),
  );
  const choice = choices.find((item) => item.id === craving)!;
  const price = trioPrice(trio);

  function chooseCraving(next: Craving) {
    setCraving(next);
    setCombination(0);
    setTrio(
      next === "surprise"
        ? shuffleTrio(trio)
        : namedTacos(combinations[next][0]),
    );
  }

  function anotherTrio() {
    if (craving === "meat-free") {
      chooseCraving("surprise");
    } else if (craving === "surprise") {
      setTrio(shuffleTrio(trio));
    } else {
      const next = (combination + 1) % combinations[craving].length;
      setCombination(next);
      setTrio(namedTacos(combinations[craving][next]));
    }
  }

  return (
    <section className="taco-picker" aria-labelledby="taco-picker-title">
      <div className="taco-picker__head">
        <div>
          <p className="taco-picker__eyebrow">YOUR NEXT THREE TACOS</p>
          <h3 id="taco-picker-title">Can&apos;t choose? Start here.</h3>
        </div>
        <p className="taco-picker__intro">Pick a craving. Meet your trio.</p>
      </div>

      <div
        className="taco-picker__choices"
        role="group"
        aria-label="Choose your taco craving"
      >
        {choices.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={craving === item.id}
            onClick={() => chooseCraving(item.id)}
          >
            {item.label}
            <span aria-hidden="true">{craving === item.id ? "✓" : "+"}</span>
          </button>
        ))}
      </div>

      <p
        className="taco-picker__line"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {choice.line}
        <span className="taco-picker__sr-only">
          {` Suggested trio: ${trio.map((dish) => dish.name).join(", ")}. Regular menu total ${price}, plus tax.`}
        </span>
      </p>

      <div className="taco-picker__grid">
        {trio.map((dish, index) => {
          const content = (
            <>
              <PhotoSlot
                src={dish.image}
                alt={dish.name}
                label={`${dish.name} · plated close-up`}
                className="taco-picker__photo"
                width={dish.imageWidth ?? 600}
                height={dish.imageHeight ?? 600}
                sizes="(max-width: 650px) 116px, (max-width: 900px) 28vw, 25vw"
              />
              <span className="taco-picker__number" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="taco-picker__food">
                <div className="taco-picker__name">
                  <h4>{dish.name.replace(/ Taco$/, "")}</h4>
                  <span>{dish.price}</span>
                </div>
                <p>{dish.desc}</p>
                {onDishSelect && (
                  <span className="taco-picker__details">
                    Meet this taco <span aria-hidden="true">↗</span>
                  </span>
                )}
              </div>
            </>
          );
          return onDishSelect ? (
            <button
              key={dish.name}
              className="taco-picker__card"
              type="button"
              onClick={() => onDishSelect(dish)}
              aria-label={`View ${dish.name} details, ${dish.price}`}
            >
              {content}
            </button>
          ) : (
            <article key={dish.name} className="taco-picker__card">
              {content}
            </article>
          );
        })}
      </div>

      <div className="taco-picker__footer">
        <div className="taco-picker__total">
          <span>YOUR TRIO</span>
          <strong>{price}</strong>
          <small>Regular menu prices · taxes extra</small>
        </div>
        <button
          type="button"
          className="taco-picker__shuffle"
          onClick={anotherTrio}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m18 3 3 3-3 3M3 6h4l10 12h4M18 15l3 3-3 3M3 18h4l3-4M14 10l3-4h4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {craving === "meat-free"
            ? "Surprise me instead"
            : "Deal me another trio"}
        </button>
      </div>
    </section>
  );
}

import pricing from "./agave-prices.json";

const prices = new Map(
  pricing.records.map(({ id, priceCad }) => [id, priceCad]),
);
const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function agavePrice(id: number) {
  return prices.get(id);
}

export function formatAgavePrice(price: number) {
  return currency.format(price);
}

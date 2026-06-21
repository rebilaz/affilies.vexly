const numberFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

const percentageFormatter = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 2,
});

export function formatCurrency(value?: number | null, currency = "EUR") {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: value < 100 ? 2 : 0,
  }).format(value);
}

export function formatNumber(value?: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }
  return numberFormatter.format(value);
}

export function formatPercentage(value?: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }
  return percentageFormatter.format(value);
}

export function formatMultiple(value?: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }
  return `${value.toFixed(2)}x`;
}

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function safeDivide(numerator: number, denominator: number) {
  if (!denominator) {
    return 0;
  }
  return numerator / denominator;
}

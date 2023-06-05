export type CurrencyFilter = {
  requirement: number;
};

export type CurrencyData = {
  filteredCurrencyMap: { [key: string]: number };
  totalExpired: number;
};

export type CurrencyFilter = {
  category: number;
  requirement: number;
};

export type CurrencyData = {
  requirement: number;
  expiry: Date;
  trainees: {
    category: number;
  };
};

export type CurrencyFilter = {
  requirement: number;
};

export type CurrencyData = {
  requirement: number;
  expiry: Date;
  trainees: {
    category: number;
  };
};

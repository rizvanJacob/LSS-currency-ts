export type NewTrainee = {
  callsign: string;
  category: number;
};

export type Trainee = NewTrainee & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  categories: {
    name: string;
  };
  user: number;
  currencies: {
    expiry: Date;
  }[];
  status?: string;
};

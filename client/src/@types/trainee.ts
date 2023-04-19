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
  users: {
    approved: boolean;
  };
  currencies: Currency[];
  status?: string;
};

export type Currency = {
  id?: number;
  expiry: Date;
  requirements?: {
    name: string;
  };
  seniority?: boolean;
};

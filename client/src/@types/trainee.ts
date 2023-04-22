export type NewTrainee = {
  callsign: string;
  category: number;
  user?: number;
};

export type Trainee = NewTrainee & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  categories: {
    name: string;
    requirements?: { requirements: Requirement }[];
  };
  users: {
    approved: boolean;
  };
  currencies: Currency[];
  status?: { message: string; color: string };
};

export type Currency = {
  id?: number;
  expiry: Date;
  requirement?: number;
  requirements?: Requirement;
  seniority?: boolean;
};

export type Requirement = {
  id: number;
  name?: string;
  hasSeniority?: boolean;
};

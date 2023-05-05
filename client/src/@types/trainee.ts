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
  status?: CurrencyStatus;
  trainings?: {
    status: number;
    statuses?: { name: string };
    trainings?: { requirement: number; start: Date };
  }[];
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
  selfComplete?: boolean;
};

export type CurrencyStatus = {
  message: string;
  className: string;
  open?: boolean;
};

export type CompletedTrainees = {
  trainee: number;
  training: number;
};

export type TraineeFilterOptions = {
  category: number;
};

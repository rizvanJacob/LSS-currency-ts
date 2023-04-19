export type NewTrainee = {
  callsign: string;
  category: number;
};

export type Trainee = NewTrainee & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user: number;
};

export type TraineeProp = {
  trainee: Trainee;
  category: string | undefined;
};

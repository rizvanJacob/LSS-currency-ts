export type Trainee = {
  id: number;
  callsign: string;
  category: number;
  createdAt: Date;
  updatedAt: Date;
  user: number;
};

export type TraineeProp = {
  trainee: Trainee;
  category: string | undefined;
};

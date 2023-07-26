export type PdResponse = {
  trainees: { trainee: number; info: string; vehicle: string }[];
};

export type PdInfo = {
  id?: number;
  mobile: string;
  nric: string;
  name: string;
};

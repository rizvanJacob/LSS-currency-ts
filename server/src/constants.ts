export const enum Account {
  Admin = 1,
  TraineeAdmin = 2,
  Trainee = 3,
  Trainer = 4,
}

export const enum Status {
  Booked = 1,
  Attended = 2,
  Completed = 3,
  Withdrawn = 4,
  Absent = 5,
  Waitlist = 6,
}

//##RIZ: Why are you setting the expiries as constants? 
//The expiry date is already returned in the token when the server returns it.
export const JWT_EXPIRIES: {
  [key in Account]: string;
} = {
  [Account.Admin]: "5s",
  [Account.TraineeAdmin]: "10s",
  [Account.Trainee]: "15s",
  [Account.Trainer]: "20s",
};

export const MONTHS_TO_RECORD_WITHDRAWAL = 1;

export const ALL = [
  Account.Admin,
  Account.TraineeAdmin,
  Account.Trainee,
  Account.Trainer,
];

export const TRAINEE_READ_ALL_ACCESS = [
  Account.Admin,
  Account.TraineeAdmin,
  Account.Trainer,
];

export const TRAINEE_WRITE_ACCESS = [Account.Admin, Account.TraineeAdmin];

export const TRAINEE_ACTIONS_ACCESS = [
  Account.Admin,
  Account.Trainee,
  Account.Trainer,
];

export const TRAINING_WRITE_ACCESS = [Account.Admin, Account.Trainer];

export const STATUSES_IN_TRAINING_LIST = [
  Status.Booked,
  Status.Attended,
  Status.Completed,
  Status.Waitlist,
];

export const STATUSES_IN_TRAINING_CAPACITY = [
  Status.Booked,
  Status.Attended,
  Status.Completed,
];

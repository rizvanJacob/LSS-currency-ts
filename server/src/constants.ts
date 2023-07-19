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

export const JWT_EXPIRIES: {
  [key in Account]: string;
} = {
  [Account.Admin]: "30m",
  [Account.TraineeAdmin]: "1h",
  [Account.Trainee]: "1d",
  [Account.Trainer]: "1h",
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

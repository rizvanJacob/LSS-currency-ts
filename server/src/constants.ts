export const enum Account {
  Admin = 1,
  TraineeAdmin = 2,
  Trainee = 3,
  Trainer = 4,
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

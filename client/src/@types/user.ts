export type BasicUser = {
  accountType: number;
  displayName: string;
  authCategory?: number | null;
};

export type TrainerUser = {
  trainings?: {
    id?: number;
    user?: number;
    requirement?: number;
  }[];
};

export type NewUser = BasicUser &
  TrainerUser & {
    openId?: string;
    requirementsProvided?: number[];
  };

export type User = NewUser & {
  id: number;
  category?: number;
  categories?: {
    name: string;
  };
  accountTypes?: {
    name: string;
  };
  approved: boolean;
  trainee?: {
    id?: number;
    callsign?: string;
    category?: number;
  };
};

export type UserFilterOptions = {
  accountType: number;
};

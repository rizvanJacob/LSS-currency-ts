type BasicUser = {
  accountType: number;
  displayName: string;
  authCategory?: number;
};

export type NewUser = BasicUser & {
  openId: string;
};

export type User = BasicUser & {
  id: number;
  approved: boolean;
};

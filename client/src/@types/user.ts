
export type NewUser = {
  openId: string;
  accountType: number;
  displayName: string;
  authCategory?: number;
};

export type User = NewUser & {
  id: number;
  accountType: number;
  displayName: string;
  approved: boolean;
  authCategory?: number;
};

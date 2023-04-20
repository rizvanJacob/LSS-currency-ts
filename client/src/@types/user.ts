
export type NewUser = {
  openId: string;
  accountType: number;
  displayName: string;
  authCategory?: number;
};

export type User = NewUser & {
  id: number;
  accountType: number;
  accountTypes?: {
    name: string;
  };
  displayName: string;
  openId?: string;
  approved: boolean;
  authCategory?: number;
};

export type NewUser = {
  openId: string;
  accountType: number;
  displayName: string;
  authCategory?: number;
};

export type UserProps = NewUser & {
  id: number;
  accountType: number;
  displayName: string;
  authCategory?: number;
};

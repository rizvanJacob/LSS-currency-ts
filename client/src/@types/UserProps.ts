export type NewUser = {
  accountType: number;
  displayName: string;
  authCategory?: number;
};

export type UserProps = NewUser & {
  id: number;
};

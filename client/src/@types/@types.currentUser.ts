export type CurrentUser = {
  accountId: number;
  accountType: number;
  category?: number;
};

export type setCurrentUserProp = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export type UserPayload = {
  accountId: number;
  displayName: string;
  accountType: number;
  category?: number;
  iat: number;
  exp: number;
};

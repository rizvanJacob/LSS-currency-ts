export type CurrentUser = {
  id: number;
  accountType: number;
  category?: number;
};

export type setCurrentUserProp = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export type UserPayload = CurrentUser & {
  displayName: string;
  iat: number;
  exp: number;
};

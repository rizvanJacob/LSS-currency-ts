export type CurrentUser = {
  id: number;
  accountType: number;
  authCategory?: number;
};

export type setCurrentUserProp = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export type UserPayload = CurrentUser & {
  displayName: string;
  iat: number;
  exp: number;
};

export type DecodedToken = {
  id: number;
  approved: boolean;
  authCategory?: number;
  displayName: string;
  accountType: number;
};

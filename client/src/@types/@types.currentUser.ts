export type CurrentUser = {
  accountId: Number;
  accountType: "admin" | "traineeAdmin" | "trainee" | "trainer";
  category?: Number;
};

export type setCurrentUserProp = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

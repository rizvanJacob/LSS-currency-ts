export type CurrentUser = {
  accountId: Number;
  accountType: "admin" | "traineeAdmin" | "trainee" | "trainer";
  category?: Number;
};

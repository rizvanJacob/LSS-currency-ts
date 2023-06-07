import * as Yup from "yup";
import { NewUser } from "../@types/user";
import { Account } from "../../../server/src/constants";
export const signUpPageSchema = (user: NewUser, includeTrainee: boolean) => {
  return Yup.object().shape({
    accountType: Yup.number().required("Account Type is required"),
    includeTrainee: Yup.boolean(),
    displayName: Yup.string().when("accountType", () => {
      return Number(user.accountType) !== Account.Trainee
        ? Yup.string().required("Display name is required")
        : Yup.string().notRequired();
    }),
    callsign: Yup.string().when("accountType", () => {
      return Number(user.accountType) === Account.Trainee
        ? Yup.string().required("Callsign is required")
        : Yup.string().notRequired();
    }),
    authCategory: Yup.number().when("accountType", () => {
      return Number(user.accountType) === Account.TraineeAdmin
        ? Yup.number()
            .required("Authorization category is required")
            .test(
              "non-zero",
              "Authorization Category cannot be empty",
              (value) => value !== 0
            )
        : Yup.number().notRequired();
    }),
    category: Yup.number().when(["accountType", "includeTrainee"], () => {
      return (Number(user.accountType) === Account.Admin && includeTrainee) ||
        Number(user.accountType) === Account.Trainee
        ? Yup.number()
            .required("Category is required")
            .test(
              "non-zero",
              "Category cannot be empty",
              (value) => value !== 0
            )
        : Yup.number().notRequired();
    }),
  });
};

import * as Yup from "yup";
import { NewUser } from "../@types/user";
import { NewTrainee } from "../@types/trainee"
import { Account } from "../../../server/src/constants"
export const signUpPageSchema = (user: NewUser) => {
    return Yup.object().shape({
        accountType: Yup.number()
            .required("Account Type is required"),
        displayName: Yup.string().when('accountType', () => {
             return Number(user.accountType) !== Account.Trainee
                ? Yup.string()
                    .required("Display name is required")
                : Yup.string().notRequired()
        }),
        callsign: Yup.string().when('accountType', () => {
            return Number(user.accountType) === Account.Trainee
                ? Yup.string()
                    .required("Callsign is required")
                : Yup.string().notRequired()
        }),
        authCategory: Yup.string().when('accountType', () => {
            return Number(user.accountType) === Account.TraineeAdmin
                ? Yup.string()
                    .required("Authorization category is required")
                : Yup.string().notRequired();
        }),
  });
};


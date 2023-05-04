import * as Yup from "yup";
import { Account } from "../../../server/src/constants";
import { User } from "../@types/user";
export const userSchema = (user: User) => {
    return Yup.object().shape({
        accountType: Yup.number()
            .default(user.accountType)
            .required("Account Type is required"),
        displayName: Yup.string()
            .default(user.displayName)
            .required("Display Name is required"),
        approved: Yup.boolean().default(user.approved),
        authCategory: Yup.number().default(user.authCategory),
        categories: Yup.object().default(user.categories),
        trainee: Yup.object().default(user.trainee),
        category: Yup.number().when("accountType", () => {
            return Number(user.accountType) === Account.Trainee
                ? Yup.number().default(user?.trainee?.category).required("Category is required")
                : Yup.number().notRequired()
        }),
        callsign: Yup.string().when('accountType', () => {
            return Number(user.accountType) === Account.Trainee
                ? Yup.string()
                    .default(user.trainee?.callsign)
                    .required("Callsign is required")
                : Yup.string().notRequired()
        }),
    });
}
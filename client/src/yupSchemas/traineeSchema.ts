import * as Yup from "yup";
import { Trainee } from "../@types/trainee";
export const traineeSchema = (trainee: Trainee) => {
    return Yup.object().shape({
        category: Yup.number().default(trainee.category).required("Category is required"),
        callsign: Yup.string().default(trainee.callsign).required("Callsign is required"),
    });
}

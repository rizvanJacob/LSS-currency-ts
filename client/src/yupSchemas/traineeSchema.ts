import * as Yup from "yup";
import { NewTrainee } from "../@types/trainee";
export const traineeSchema = (trainee: NewTrainee) => {
    console.log("traineeSchema is loaded")
    return Yup.object().shape({
        category: Yup.number().default(trainee.category).required("Category is required"),
        callsign: Yup.string().default(trainee.callsign).required("Callsign is required")
    });
}
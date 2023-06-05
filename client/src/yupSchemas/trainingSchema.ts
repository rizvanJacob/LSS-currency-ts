import * as Yup from "yup";
import { Training } from "../@types/training";
import { NewTraining } from "../@types/training";
import dayjs from "dayjs";
export const trainingSchema = (training: Training) => {
  return Yup.object().shape({
    capacity: Yup.number()
      .default(training.capacity)
      .min(1, "Capacity needs to be greater than 0")
      .required("Capacity is required"),
    start: Yup.date()
      .typeError("Start date is required and must be a valid date")
      .default(dayjs(training.start).toDate())
      .required("Start date is required")
      .test("is-future", "Start date must be a future date", (value) => {
        const today = dayjs().toDate();
        return value && value > today;
      }),
    end: Yup.date()
      .typeError("End date is required and must be a valid date")
      .default(dayjs(training.end).toDate())
      .required("End date is required")
      .test("is-future", "End date must be a future date", (value) => {
        const today = dayjs().toDate();
        return value && value > today;
      })
      .test("is-after-start", "End date must be after start date", (value) => {
        const start = dayjs(training.start).toDate();
        return value && value > start;
      }),
  });
};

export const newTrainingSchema = (training: NewTraining) => {
  return Yup.object().shape({
    requirement: Yup.number()
      .required("Requirement is required")
      .min(1, "Requirement is required"),
    capacity: Yup.number()
      .min(1, "Capacity needs to be greater than 0")
      .required("Capacity is required"),
    start: Yup.date()
      .typeError("Start date is required and must be a valid date")
      .required("Start date is required")
      .test("is-future", "Start date must be a future date", (value) => {
        const today = dayjs().toDate();
        return value && value > today;
      }),
    end: Yup.date()
      .typeError("End date is required and must be a valid date")
      .required("End date is required")
      .test("is-future", "End date must be a future date", (value) => {
        const today = dayjs().toDate();
        return value && value > today;
      })
      .test("is-after-start", "End date must be after start date", (value) => {
        const start = dayjs(training.start).toDate();
        return value && value > start;
      }),
  });
};

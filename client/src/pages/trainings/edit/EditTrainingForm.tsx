import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Training } from "../../../@types/training";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";
import dayjs from "dayjs";
import { trainingSchema } from "../../../yupSchemas/trainingSchema";
import { TitleContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";

export default function EditTrainingForm(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [training, setTraining] = useState<Training>({
    id: 0,
    capacity: 0,
    start: new Date(),
    end: new Date(),
    complete: false,
    requirement: 0,
    requirements: {
      name: "",
    },
    instruction: "",
    passphrase: "",
    trainees: [
      {
        trainees: {
          callsign: "",
          categories: {
            name: "",
          },
          currencies: {
            expiry: new Date(),
          },
        },
      },
    ],
  });
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  const initialTraining = useRef<Training>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getRequest(`/api/trainings/${id}`, setTraining)
      .then((response) => {
        initialTraining.current = response?.response?.data;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    if (setTitle) setTitle("Edit Training");
  }, []);

  const handleFormSubmit = async () => {
    await putRequest(`/api/trainings/${id}`, training, setTraining);
    navigate(`/trainings`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTraining((training) => {
      if (name === "start") {
        const newStart = dayjs(value).toDate();
        const newEnd = dayjs(value).toDate();
        return { ...training, start: newStart, end: newEnd };
      } else if (name === "end") {
        const newEnd = dayjs(value).toDate();
        return { ...training, end: newEnd };
      } else if (name === "start_time") {
        const [hours, minutes] = value.split(":");
        const newStart = dayjs(training.start)
          .set("hour", parseInt(hours))
          .set("minute", parseInt(minutes))
          .toDate();
        return { ...training, start: newStart };
      } else if (name === "end_time") {
        const [hours, minutes] = value.split(":");
        const newEnd = dayjs(training.end)
          .set("hour", parseInt(hours))
          .set("minute", parseInt(minutes))
          .toDate();
        return { ...training, end: newEnd };
      } else {
        return {
          ...training,
          [name]: name === "capacity" ? Number(value) : value,
        };
      }
    });
  };

  return isLoading ? (
    <ProgressBar />
  ) : (
    <div className="max-w-lg mx-auto">
      <h1 className="text-lg text-center font-bold mb-8">
        {initialTraining?.current?.requirements?.name} on {""}
        {dayjs(initialTraining?.current?.start).format("DD MMM YY")}
      </h1>
      <div className="flex items-center justify-center">
        <Formik
          initialValues={training}
          onSubmit={handleFormSubmit}
          enableReinitialize
          validationSchema={trainingSchema(training)}
        >
          {({ isSubmitting, isValidating, isValid }) => (
            <Form className="space-y-6 m-auto">
              <div className="flex items-center">
                <label className="text-left w-2/5">Start Date:</label>
                <div className="flex-1">
                  <Field
                    type="date"
                    id="start"
                    name="start"
                    value={dayjs(training?.start).format("YYYY-MM-DD") || ""}
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={handleInputChange}
                  />
                  <div className="error-message text-error">
                    <ErrorMessage name="start" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 text-left">Start Time:</label>
                <div className="flex-1">
                  <Field
                    type="time"
                    id="start_time"
                    name="start_time"
                    value={dayjs(training?.start).format("HH:mm") || ""}
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 text-left">End Date:</label>
                <div className="flex-1">
                  <Field
                    type="date"
                    id="end"
                    name="end"
                    value={dayjs(training?.end).format("YYYY-MM-DD") || ""}
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={handleInputChange}
                  />
                  <div className="error-message text-error">
                    <ErrorMessage name="end" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 text-left">End Time:</label>
                <div className="flex-1">
                  <Field
                    type="time"
                    id="end_time"
                    name="end_time"
                    value={dayjs(training?.end).format("HH:mm") || ""}
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 text-left">Capacity:</label>
                <div className="flex-1">
                  <Field
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={training?.capacity || null}
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={handleInputChange}
                  />
                  <div className="error-message text-error">
                    <ErrorMessage name="capacity" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 text-left">
                  Additional Instructions:
                </label>
                <div className="flex-1">
                  <Field
                    as="textarea"
                    type="text"
                    id="instruction"
                    name="instruction"
                    value={training?.instruction || ""}
                    className="textarea textarea-primary w-full"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-2/5 text-left">Check In Passphrase:</label>
                <Field
                  as="input"
                  type="text"
                  id="passphrase"
                  name="passphrase"
                  value={training?.passphrase || ""}
                  className="input-text input input-bordered input-primary flex-1"
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isValidating || !isValid}
                className="btn btn-primary btn-block "
              >
                Update Training
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

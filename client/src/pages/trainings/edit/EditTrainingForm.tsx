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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

  const handleDateInputChange = (value: Date | null, fieldName: string) => {
    setTraining((training) => {
      if (fieldName === "start") {
        const newStart = value || new Date();
        return { ...training, start: newStart, end: newStart };
      } else if (fieldName === "end") {
        const newEnd = value || new Date();
        return { ...training, end: newEnd };
      } else {
        return training;
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTraining((training) => {
      if (name === "start_time") {
        const [hours, minutes] = value.split(":");
        const newStart = dayjs(training.start)
          .set("hour", isNaN(parseInt(hours)) ? 0 : parseInt(hours))
          .set("minute", isNaN(parseInt(minutes)) ? 0 : parseInt(minutes))
          .toDate();
        return { ...training, start: newStart, end: newStart};
      } else if (name === "end_time") {
        const [hours, minutes] = value.split(":");
        const newEnd = dayjs(training.end)
          .set("hour", isNaN(parseInt(hours)) ? 0 : parseInt(hours))
          .set("minute", isNaN(parseInt(minutes)) ? 0 : parseInt(minutes))
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
  console.log("Training Start", new Date(training?.start).toISOString().split("T")[0])
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
          validateOnMount
          onSubmit={handleFormSubmit}
          enableReinitialize
          validationSchema={trainingSchema(training)}
        >
          {({ isSubmitting, isValidating, isValid, setFieldValue, setFieldTouched }) => (
            <Form className="space-y-6 m-auto">
              <div className="flex items-center">
                <label className="text-left w-2/5">Start Date:</label>
                <div className="flex-1">
                  <Field
                    as={DatePicker}
                    type="date"
                    id="start"
                    name="start"
                    selected={dayjs(training?.start).toDate()}
                    value={dayjs(training?.start) || ""}
                    dateFormat={["dd/MM/yyyy", "dd/MM/yy"]}
                    placeholderText="dd/mm/yy"
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={(value: Date) => {
                      handleDateInputChange(value, "start")
                      setFieldValue("start", value);
                      setFieldTouched("start", true);
                    }}
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
                    as={DatePicker}
                    type="date"
                    id="end"
                    name="end"
                    dateFormat={["dd/MM/yyyy", "dd/MM/yy"]}
                    placeholderText="dd/mm/yy"
                    value={dayjs(training?.end) || ""}
                    selected={dayjs(training?.end).toDate()}
                    className="input-text input input-bordered input-primary w-full max-w-xs"
                    onChange={(value: Date) => handleDateInputChange(value, "end")}
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
                <div className="flex-1">
                  <Field
                    as="input"
                    type="text"
                    id="passphrase"
                    name="passphrase"
                    value={training?.passphrase || ""}
                    className="input-text input input-bordered input-primary w-full"
                    onChange={handleInputChange}
                  />
                </div>
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

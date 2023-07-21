import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewTraining } from "../../../@types/training";
import { trainingProvided } from "../../../@types/lookup";
import { SimpleLookup } from "../../../@types/lookup";
import getRequest from "../../../utilities/getRequest";
import postRequest from "../../../utilities/postRequest";
import dayjs from "dayjs";
import { newTrainingSchema } from "../../../yupSchemas/trainingSchema";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext, TitleContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateTrainingForm(): JSX.Element {
  const [trainingsProvided, setTrainingProvided] = useState<trainingProvided[]>(
    []
  );
  const [requirements, setRequirements] = useState<SimpleLookup[]>([]);
  const [training, setTraining] = useState<NewTraining>({
    id: 0,
    capacity: 0,
    start: dayjs(new Date()).add(5,"minute").toDate(),
    end: dayjs(new Date()).add(10,"minute").toDate(),
    requirement: 0,
    requirements: {
      name: "",
    },
    instruction: "",
    passphrase: "",
  });
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const navigate = useNavigate();
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Create New Training");
    getRequest(`/api/lookup/trainingsProvided`, setTrainingProvided);

    currentUser?.accountType === Account.Admin
      ? getRequest(`/api/lookup/requirements?forTraining=true`, setRequirements)
      : null;
  }, []);

  const handleFormSubmit = async () => {
    await postRequest(`/api/trainings`, training, setTraining);
    navigate(`/trainings`);
  };

  const handleDateInputChange = (value: Date | null, fieldName: string) => {
    setTraining((training) => {
      if (fieldName === "start") {
        const newStart = value || new Date();
        return { ...training, start: newStart, end: newStart };
      } else if (fieldName === "end") {
        const newEnd = value || new Date();
        training.end = newEnd;
      }
      return training;
    });
  };


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
    const { name, value } = event.target;
    setTraining((training) => {
      if (name === "start_time") {
        const [hours, minutes] = value.split(":");
        const newStart = dayjs(training.start)
          .set("hour", isNaN(parseInt(hours)) ? 0 : parseInt(hours))
          .set("minute", isNaN(parseInt(minutes)) ? 0 : parseInt(minutes))
          .toDate();
        return { ...training, start: newStart, end: newStart };

      } else if (name === "end_time") {
        const [hours, minutes] = value.split(":");
        const newEnd = dayjs(training.end)
          .set("hour", isNaN(parseInt(hours)) ? 0 : parseInt(hours))
          .set("minute", isNaN(parseInt(minutes)) ? 0 : parseInt(minutes))
          .toDate();
        return { ...training, end: newEnd };
      } else if (name === "name") {
        return {
          ...training,
          requirement:
            currentUser?.accountType !== Account.Admin
              ? trainingsProvided.find(
                  (type) => value === type?.requirements?.name
                )?.requirement ?? 0
              : requirements.find((type) => value === type.name)?.id ?? 0,
        };
      } else {
        return {
          ...training,
          [name]: value,
        };
      }
    });
  };
  
  return trainingsProvided.length || requirements.length ? (
    <div className="max-w-lg mx-auto">
      <Formik
        initialValues={training}
        validateOnMount
        onSubmit={handleFormSubmit}
        enableReinitialize
        validationSchema={newTrainingSchema(training)}
      >
        {({ isSubmitting, isValidating, isValid, setFieldTouched, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="flex items-center">
              <label className="w-2/5 text-left">Requirement:</label>
              <div className="flex-1">
                <Field
                  as="select"
                  type="text"
                  id="name"
                  name="name"
                  className="input-select select select-primary w-full max-w-xs"
                  onChange={handleInputChange}
                >
                  <option value={""}>Select a Requirement</option>
                  {currentUser?.accountType !== Account.Admin
                    ? trainingsProvided.map((type) =>
                        type.user === currentUser?.id ? (
                          <option
                            value={type.requirements?.name}
                            key={type.requirement}
                          >
                            {type.requirements?.name}
                          </option>
                        ) : null
                      )
                    : requirements.map((type) => (
                        <option value={type.name} key={type.id}>
                          {type.name}
                        </option>
                      ))}
                </Field>
                <div className="error-message text-error">
                  <ErrorMessage name="name"/>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-2/5 text-left">Start Date:</label>
              <div className="flex-1">
                <Field
                  as={DatePicker}
                  type="date"
                  id="start"
                  dateFormat={["dd/MM/yyyy", "dd/MM/yy"]}
                  placeholderText="dd/mm/yy"
                  name="start"
                  selected={training?.start ? new Date(training.start) : null}
                  className="input-text input input-bordered input-primary w-full max-w-xs"
                  onBlur={() => setFieldTouched("start", true)}
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
                  dateFormat={["dd/MM/yyyy", "dd/MM/yy"]}
                  placeholderText="dd/mm/yy"
                  name="end"
                  selected={training?.end ? new Date(training.end) : null}
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
                  value={training?.capacity || ""}
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
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <ProgressBar />
  );
}

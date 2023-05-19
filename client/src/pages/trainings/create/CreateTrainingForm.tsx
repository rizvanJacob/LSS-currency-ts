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

export default function CreateTrainingForm(): JSX.Element {
  const [trainingsProvided, setTrainingProvided] = useState<trainingProvided[]>([]);
  const [requirements, setRequirements] = useState<SimpleLookup[]>([]);
  const [training, setTraining] = useState<NewTraining>({
    id: 0,
    capacity: 0,
    start: new Date(),
    end: new Date(),
    requirement: 0,
    requirements: {
      name: "",
    },
    instruction: "",
  });
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const navigate = useNavigate();
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("New Training");
    getRequest(`/api/lookup/trainingsProvided`, setTrainingProvided);
    (currentUser?.accountType === Account.Admin) 
      ? getRequest(`/api/lookup/requirements?forTraining=true`, setRequirements)
      : null;
  }, []);

  const handleFormSubmit = async () => {
    await postRequest(`/api/trainings`, training, setTraining);
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
      } else if (name === "name") {
        return {
          ...training,
          requirement:
            (currentUser?.accountType !== Account.Admin) 
              ? trainingsProvided.find((type) => value === type?.requirements?.name)?.requirement ?? 0
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

  return (
    <fieldset>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-bold mb-8">
          Create Training Session
        </h1>
        <div className="flex items-center justify-center">
          <Formik
            initialValues={training}
            onSubmit={handleFormSubmit}
            enableReinitialize
            validationSchema={newTrainingSchema(training)}
          >
            {({ isSubmitting, isValidating, isValid }) => (
              <Form className="space-y-6">
                <div className="flex items-center">
                  <label className="w-2/4">Requirement Type:</label>
                  <div className="w-2/4">
                    <Field
                      as="select"
                      type="text"
                      id="name"
                      name="name"
                      className="input-select select select-primary w-full max-w-xs"
                      onChange={handleInputChange}
                    >
                      {currentUser?.accountType !== Account.Admin ? (
                        trainingsProvided.map((type) =>
                          type.user === currentUser?.id ? (
                            <option value={type.requirements?.name} key={type.requirement}>
                              {type.requirements?.name}
                            </option>
                          ) : null
                        )
                      ) : (
                        requirements.map((type) => (
                          <option value={type.name} key={type.id}>
                            {type.name}
                          </option>
                        ))
                      )}
                    </Field>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="w-2/4">Start Date:</label>
                  <div className="w-3/4">
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
                  <label className="w-2/4">Start Time:</label>
                  <div className="w-3/4">
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
                  <label className="w-2/4">End Date:</label>
                  <div className="w-3/4">
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
                  <label className="w-2/4">End Time:</label>
                  <div className="w-3/4">
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
                  <label className="w-2/4">Capacity:</label>
                  <div className="w-3/4">
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
                  <label className="w-2/4">Additional Instructions:</label>
                  <div className="w-3/4">
                    <Field
                      as="textarea"
                      type="text"
                      id="instruction"
                      name="instruction"
                      value={training?.instruction || ""}
                      className="textarea textarea-primary"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting || isValidating || !isValid}
                    className="btn btn-info "
                  >
                    Create
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </fieldset>
  );
}

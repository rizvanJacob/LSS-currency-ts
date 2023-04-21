import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Training } from "../../../@types/training";
import { SimpleLookup } from "../../../@types/lookup";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";
import dayjs from "dayjs";
export default function EditTrainingForm(): JSX.Element {
    const { id } = useParams();
    const [requirementTypes, setRequirementTypes] = useState<SimpleLookup[]>([])
    const [training, setTraining] = useState<Training>({ 
                id: 0,
                capacity: 0,
                start: new Date(),
                end: new Date(),
                complete: false,
                requirement: 0,
                requirements: {
                    name: ''
                },
                trainees: {
                    trainees: {
                        callsign: '',
                        categories: {
                            name: '',
                        },
                        currencies: {
                            expiry: new Date()
                        }
                    }
                },
                instruction: ""
            });
    const navigate = useNavigate();

    useEffect(() => {
        getRequest(`/api/trainings/${id}`, setTraining);
    }, [id, setTraining]);

    useEffect(() => {
        getRequest(`/api/lookup/requirements`, setRequirementTypes);
    }, [])

    const handleFormSubmit = async () => {
        await putRequest(`/api/trainings/${id}`, training, setTraining);
        navigate(`/trainings`);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTraining(training => {
            if (name === 'requirement') {
            return {
                ...training,
                requirement: requirementTypes.find((type) => (value === type.name))?.id ?? 0,
            };
            } else if (name === 'start') {
                const newStart = dayjs(value).toDate();
                return { ...training, start: newStart }
            } else if (name === 'end') {
                const newEnd = dayjs(value).toDate();
                return { ...training, end: newEnd }
            } else if (name === 'start_time') {
                const [hours, minutes] = value.split(':');
                const newStart = dayjs(training.start).set('hour', parseInt(hours)).set('minute', parseInt(minutes)).toDate();
                return { ...training, start: newStart }
            } else if (name === 'end_time') {
                const [hours, minutes] = value.split(':');
                const newEnd = dayjs(training.end).set('hour', parseInt(hours)).set('minute', parseInt(minutes)).toDate();
                return { ...training, end: newEnd }
            } else {
                return {
                    ...training,
                    [name]: value
                };
            }
        });
    };

  return (
    <fieldset>
        <legend>Edit {training?.requirements?.name} on {dayjs(training?.start).format("YYYY-MM-DD")}</legend>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Formik initialValues={training} onSubmit={handleFormSubmit}>
            {({ isSubmitting, isValidating, isValid }) => (
                <Form>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Requirement Type:</label>
                        <Field
                            as="select"
                            type="text"
                            id="requirement"
                            name="requirement"
                            value={requirementTypes.find((type) => (training?.requirement === type.id))?.name || ""}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a requirement</option>
                            {requirementTypes.map((type) => {
                                return (
                                    <option value={type.name} key ={type.id}>
                                        {type.name}
                                    </option>
                                )
                            })}
                        </Field>
                        <ErrorMessage name="requirement" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Start Date:</label>
                        <Field
                            type="date"
                            id="start"
                            name="start"
                            value={dayjs(training?.start).format("YYYY-MM-DD") || ""}
                            onChange={handleInputChange}
                        />
                        <ErrorMessage name="start_date" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Start Time:</label>
                        <Field
                            type="time"
                            id="start_time"
                            name="start_time"
                            value={dayjs(training?.start).format("HH:mm") || ""}
                            onChange={handleInputChange}
                        />
                        <ErrorMessage name="start_time" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>End Date:</label>
                        <Field
                            type="date"
                            id="end"
                            name="end"
                            value={dayjs(training?.end).format("YYYY-MM-DD") || ""}
                            onChange={handleInputChange}
                        />
                        <ErrorMessage name="start_date" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>End Time:</label>
                        <Field
                            type="time"
                            id="end_time"
                            name="end_time"
                            value={dayjs(training?.end).format("HH:mm") || ""}
                            onChange={handleInputChange}
                        />
                        <ErrorMessage name="end_time" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Capacity:</label>
                        <Field
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={training?.capacity || ""}
                        onChange={handleInputChange}
                        />
                        <ErrorMessage name="capacity" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Additional Instructions:</label>
                        <Field
                        as="textarea"
                        type="text"
                        id="instruction"
                        name="instruction"
                        value={training?.instruction || ""}
                        onChange={handleInputChange}
                        />
                        <ErrorMessage name="instruction" />
                    </div>
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <button
                    type="submit"
                    disabled={isSubmitting || isValidating || !isValid}
                    style={{ backgroundColor: "#00A0A0" }}
                    >
                    Update Training
                    </button>
                </div>
                </Form>
            )}
            </Formik>
        </div>
    </fieldset>
  );
}

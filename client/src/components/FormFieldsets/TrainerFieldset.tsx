import { Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import getRequest from "../../utilities/getRequest";
import ProgressBar from "../ProgressBar";
import { User } from "../../@types/user";
import { Requirement } from "../../@types/lookup";

type Props = {
  user: User & { trainings?: { id?: number; user?: number; requirement?: number }[] };
  setUser: React.Dispatch<React.SetStateAction<User>>
  handleChange: any;
  requirementsProvided: number[];
  setRequirementsProvided: React.Dispatch<React.SetStateAction<number[]>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrainerFieldset = ({
  user,
  setUser,
  handleChange,
  requirementsProvided,
  setRequirementsProvided,
  setIsLoading
}: Props) => {
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [requirements, setRequirements] = useState<Requirement[] | null>(null);

  useEffect(() => {
    getRequest("/api/lookup/requirements?forTraining=true", setRequirements);
  }, []);

  useEffect(() => {
    if (loadedCount === requirements?.length && setIsLoading) {
      setIsLoading(false);
    }
  }, [loadedCount])

  useEffect(() => {
    if (requirements) {
      setLoadedCount(requirements.length);
    }
  }, [requirements]);
  
  const changeRequirementsProvided = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (requirementsProvided.includes(value)) {
      setRequirementsProvided(requirementsProvided.filter((r) => r !== value));
      setUser({
      ...user,
      trainings: user.trainings?.filter((t) => t.requirement !== value)
    });
    } else {
      setRequirementsProvided([...requirementsProvided, value]);
      setUser({
      ...user,
      trainings: [
        ...(user.trainings ?? []),
        { requirement: value }
      ]
    });
    }
  };


  return requirements ? (
    <div className="flex items-center justify-center m-auto justify-content text-center">
      <fieldset>
        <label className="w-1/4">Display Name:</label>
        <div className="w-4/4">
          <Field
            type="text"
            id="displayName"
            name="displayName"
            className="input-text input input-bordered input-primary w-full max-w-xs"
            value={user.displayName}
            onChange={handleChange}
          />
          <div className="error-message text-error">
            <ErrorMessage name="displayName" />
          </div>
        </div>
        <label className="w-1/4"> Training Provided:</label>
        <div className="w-4/4 flex flex-col">
          {requirements?.map((r) => {
            return (
              <label key={r.id} className="self-start">
                <Field
                  type="checkbox"
                  name="requirementsProvided"
                  value={r.id}
                  className="checkbox"
                  checked={user?.trainings?.some((training) => training.requirement === r.id)}
                  onChange={changeRequirementsProvided}
                />
                {r.name}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  ) : (
    <ProgressBar />
  );
};

export default TrainerFieldset;

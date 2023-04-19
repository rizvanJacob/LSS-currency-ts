import { Field } from "formik";
import { NewUser } from "../../../../@types/user";
import { useState, useEffect } from "react";
import getRequest from "../../../../utilities/getRequest";
import { Requirement } from "../../../../@types/lookup";

type Props = {
  user: NewUser;
  handleChange: any;
  requirementsProvided: number[];
  setRequirementsProvided: React.Dispatch<React.SetStateAction<number[]>>;
};

const TrainerFieldset = ({
  user,
  handleChange,
  requirementsProvided,
  setRequirementsProvided,
}: Props) => {
  const [requirements, setRequirements] = useState<Requirement[] | null>(null);

  useEffect(() => {
    getRequest("/api/lookup/requirements", setRequirements);
  }, []);

  const changeRequirementsProvided = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(event.target.value);
    if (requirementsProvided.includes(value)) {
      setRequirementsProvided(requirementsProvided.filter((r) => r !== value));
    } else {
      setRequirementsProvided([...requirementsProvided, value]);
    }
  };

  return (
    <fieldset>
      <label>
        Display Name:
        <Field
          type="text"
          id="displayName"
          name="displayName"
          value={user.displayName}
          onChange={handleChange}
        />
      </label>
      <label>
        Training Provided:
        <div>
          {requirements?.map((r) => {
            return (
              <label key={r.id}>
                <Field
                  type="checkbox"
                  name="requirementsProvided"
                  value={r.id}
                  checked={requirementsProvided.includes(r.id)}
                  onChange={changeRequirementsProvided}
                />
                {r.name}
              </label>
            );
          })}
        </div>
      </label>
    </fieldset>
  );
};

export default TrainerFieldset;

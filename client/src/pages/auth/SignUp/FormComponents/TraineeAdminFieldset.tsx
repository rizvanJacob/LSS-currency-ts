import { Field } from "formik";
import { useEffect, useState } from "react";
import getRequest from "../../../../utilities/getRequest";
import { NewUser } from "../../../../@types/UserProps";
import { SimpleLookup } from "../../../../@types/lookup";
import { NewTrainee } from "../../../../@types/trainee";

type Prop = {
  user: NewUser;
  handleChange: any;
  setTrainee: React.Dispatch<React.SetStateAction<NewTrainee>>;
};

const TraineeAdminFieldset = ({ user, handleChange, setTrainee }: Prop) => {
  const [categories, setCategories] = useState<SimpleLookup[] | null>(null);
  const [includeTrainee, setIncludeTrainee] = useState<boolean>(false);

  useEffect(() => {
    getRequest("/api/lookup/categories", setCategories);
  }, []);

  useEffect(() => {
    if (includeTrainee) {
      setTrainee({
        callsign: user.displayName,
        category: user.authCategory as number,
      });
    } else {
      setTrainee({ callsign: "", category: 0 });
    }
  }, [includeTrainee, user]);

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
        Authorized Category
        <Field
          as="select"
          name="authCategory"
          value={user.authCategory}
          onChange={handleChange}
        >
          <option value="">Select Authorized Category</option>
          {categories?.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </Field>
      </label>
      <label>
        Include Trainee account
        <Field
          name="includeTrainee"
          type="checkbox"
          checked={includeTrainee}
          onChange={() => setIncludeTrainee(!includeTrainee)}
        />
      </label>
    </fieldset>
  );
};

export default TraineeAdminFieldset;

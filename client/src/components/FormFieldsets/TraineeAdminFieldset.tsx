import { Field } from "formik";
import { useEffect, useState } from "react";
import getRequest from "../../utilities/getRequest";

import { NewUser } from "../../@types/user";
import { SimpleLookup } from "../../@types/lookup";
import { NewTrainee } from "../../@types/trainee";

type Prop = {
  user: NewUser;
  handleChange: any;
  setTrainee: React.Dispatch<React.SetStateAction<NewTrainee>>;
  includeTrainee: boolean;
  setIncludeTrainee: React.Dispatch<React.SetStateAction<boolean>>
};

const TraineeAdminFieldset = ({ user, handleChange, setTrainee, includeTrainee, setIncludeTrainee }: Prop) => {
  const [categories, setCategories] = useState<SimpleLookup[] | null>(null);
  //const [includeTrainee, setIncludeTrainee] = useState<boolean>(false);

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
     <div className="flex items-center justify-center">
      <fieldset>
        <label className="w-2/4">Display Name:</label>
          <div className="w-3/4">
            <Field
              type="text"
              id="displayName"
              name="displayName"
              value={user.displayName}
              onChange={handleChange}
              className="input-text input input-bordered input-primary w-full max-w-xs"
            />
          </div>
        <label className="w-2/4">Authorized Category: </label>
           <div className="w-3/4">
              <Field
                as="select"
                name="authCategory"
                value={user.authCategory}
                className="input-select select select-primary w-full max-w-xs"
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
          </div>
        
        <label className="w-2/4">Include Trainee account:</label>
          <div className="w-3/4">
            <Field
              name="includeTrainee"
              type="checkbox"
              checked={includeTrainee}
              className="checkbox"
              onChange={() => setIncludeTrainee(!includeTrainee)}
            />
          </div>
      </fieldset>
    </div>
  );
};

export default TraineeAdminFieldset;

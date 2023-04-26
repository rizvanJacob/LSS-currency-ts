import { Field } from "formik";
import { useEffect, useState } from "react";
import getRequest from "../../utilities/getRequest";

import { NewTrainee } from "../../@types/trainee";
import { SimpleLookup } from "../../@types/lookup";

type Prop = {
  trainee: NewTrainee;
  handleChange: any;
};

const TraineeParticularsFieldset = ({ trainee, handleChange }: Prop) => {
  const [categories, setCategories] = useState<SimpleLookup[] | null>(null);

  useEffect(() => {
    getRequest("/api/lookup/categories", setCategories);
  }, []);
  

  return (
     <div className="flex items-center justify-center">
      <fieldset>
        <label className="w-2/4">Callsign: </label>
        <div className="w-3/4">
          <Field
            type="text"
            name="callsign"
            value={trainee.callsign}
            onChange={handleChange}
            className="input-text input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <label className="w-2/4">Category: </label>
        <div className="w-3/4">
          <Field
            as="select"
            type="number"
            name="category"
            value={trainee.category}
            className="input-select select select-primary w-full max-w-xs"
            onChange={handleChange}
          >
            {categories?.map((c) => {
              return (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              );
            })}
          </Field>
        </div>
      </fieldset>
    </div>
  );
};

export default TraineeParticularsFieldset;

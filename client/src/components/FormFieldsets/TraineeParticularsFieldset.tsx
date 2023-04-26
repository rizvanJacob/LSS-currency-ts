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
    <fieldset>
      <label>Callsign: </label>
      <Field
        type="text"
        name="callsign"
        value={trainee.callsign}
        onChange={handleChange}
      />
      <label>Category: </label>
      <Field
        as="select"
        type="number"
        name="category"
        value={trainee.category}
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
    </fieldset>
  );
};

export default TraineeParticularsFieldset;

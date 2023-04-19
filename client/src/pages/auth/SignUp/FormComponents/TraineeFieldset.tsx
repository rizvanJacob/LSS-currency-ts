import { Field } from "formik";
import { NewTrainee } from "../../../../@types/trainee";
import { useEffect, useState } from "react";
import { SimpleLookup } from "../../../../@types/lookup";
import getRequest from "../../../../utilities/getRequest";

type Prop = {
  trainee: NewTrainee;
  handleChange: any;
};

const TraineeFieldset = ({ trainee, handleChange }: Prop) => {
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
        name="category"
        value={trainee.category}
        onChange={handleChange}
      >
        <option value={0}>Select category</option>
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

export default TraineeFieldset;

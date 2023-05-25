import { useField, useFormikContext, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import getRequest from "../../utilities/getRequest";
import { NewTrainee } from "../../@types/trainee";
import { SimpleLookup } from "../../@types/lookup";
import { CancelTokenSource } from "axios";
import ProgressBar from "../ProgressBar";
import * as Yup from "yup";
type Prop = {
  trainee: NewTrainee;
  handleChange: any;
  setIsLoadingParticulars?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TraineeParticularsFieldset = ({
  trainee,
  handleChange,
  setIsLoadingParticulars
}: Prop) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<SimpleLookup[] | null>(null);

  useEffect(() => {
    let cancelToken: CancelTokenSource;
    getRequest("/api/lookup/categories", setCategories).then(({ source }) => {
      cancelToken = source;
    });
    return () => {
      cancelToken?.cancel();
    };
  }, []);

  useEffect(() => {
    if (trainee.callsign && trainee.category && setIsLoadingParticulars) {
      setIsLoading(false);
      setIsLoadingParticulars(false);
    }
  }, [trainee]);

  return isLoading ? (
    <ProgressBar />
  ) : (
    <div className="flex">
      <fieldset>
        <label htmlFor="callsign" className="w-2/4">
          Callsign:
        </label>
        <div>
          <Field
            type="text"
            id="callsign"
            name="callsign"
            value={trainee.callsign || ""}
            onChange={handleChange}
            className="input-text input input-bordered input-primary w-full max-w-xs"
          />
          <div className="error-message text-error">
            <ErrorMessage name="callsign" />
          </div>
        </div>
        <label className="w-2/4">Category: </label>
        <div>
          <Field
            as="select"
            type="number"
            id="category"
            name="category"
            value={trainee?.category || ""}
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
          <div className="error-message text-error">
            <ErrorMessage name="category" />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default TraineeParticularsFieldset;

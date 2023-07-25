import { ErrorMessage, Field } from "formik";

type Props = {
  vehicle: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const VehicleNumberField = ({ vehicle, handleChange }: Props) => {
  return (
    <>
      <label className="w-2/4">Vehicle Registration No: </label>
      <div>
        <Field
          type="text"
          id="vehicle"
          name="vehicle"
          value={vehicle || ""}
          onChange={handleChange}
          className="input-text input input-bordered input-primary w-full max-w-xs"
        />
        <div className="error-message text-error">
          <ErrorMessage name="vehicle" />
        </div>
      </div>
    </>
  );
};

export default VehicleNumberField;

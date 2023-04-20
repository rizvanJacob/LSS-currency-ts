import { Currency, Requirement } from "../../@types/trainee";
import { Field } from "formik";
import dayjs from "dayjs";

type Prop = {
  requirement: Requirement;
  currency: Currency | undefined;
  handleChange: any;
};

const CurrencyFieldset = ({ requirement, currency, handleChange }: Prop) => {
  return (
    <fieldset>
      <legend>{requirement.name}</legend>
      <label>Expires: </label>
      <Field
        type="date"
        id={requirement.id}
        name="currencies"
        value={currency ? dayjs(currency?.expiry).format("YYYY-MM-DD") : ""}
        onChange={handleChange}
      />
    </fieldset>
  );
};

export default CurrencyFieldset;

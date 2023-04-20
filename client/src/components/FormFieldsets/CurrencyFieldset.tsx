import { Currency, Requirement } from "../../@types/trainee";
import { Field } from "formik";
import dayjs from "dayjs";

type Prop = {
  requirement: Requirement;
  currency: Currency | undefined;
  handleExpiryChange: any;
  handleSeniorityChange: any;
};

const CurrencyFieldset = ({
  requirement,
  currency,
  handleExpiryChange,
  handleSeniorityChange,
}: Prop) => {
  return (
    <fieldset>
      <legend>{requirement.name}</legend>
      <label>
        Expires:
        <Field
          type="date"
          id={requirement.id}
          name="currencies"
          value={currency ? dayjs(currency?.expiry).format("YYYY-MM-DD") : ""}
          onChange={handleExpiryChange}
        />
      </label>
      {requirement.hasSeniority && (
        <label>
          Senior:
          <Field
            type="checkbox"
            id={requirement.id}
            name="seniority"
            checked={currency?.seniority}
            onChange={handleSeniorityChange}
          />
        </label>
      )}
    </fieldset>
  );
};

export default CurrencyFieldset;

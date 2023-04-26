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
    <div className="flex items-center justify-center">
      <fieldset>
        <label className="w-2/4">{requirement.name}</label>
        <label className="w-2/4">Expires:</label>
        <div className="w-3/4">
          <Field
            type="date"
            id={requirement.id}
            name="currencies"
            className="input-text input input-bordered input-primary w-full max-w-xs"
            value={currency ? dayjs(currency?.expiry).format("YYYY-MM-DD") : ""}
            onChange={handleExpiryChange}
          />
        </div>
        <label className="w-2/4">Senior:</label>
        <div className="w-3/4">
        {requirement.hasSeniority && (
          <Field
            type="checkbox"
            id={requirement.id}
            name="seniority"
            checked={currency?.seniority}
            className="checkbox"
            onChange={handleSeniorityChange}
          />
        )}
        </div>
      </fieldset>
    </div>
  );
};

export default CurrencyFieldset;

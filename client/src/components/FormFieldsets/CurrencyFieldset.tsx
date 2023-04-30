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
    <div className="flex justify-center">
      <fieldset className="card w-72 px-5 bg-primary text-secondary">
        <label className="card-title py-3">{requirement.name}</label>
        <div className="flex flex-row">
          <label className="self-start py-3 mr-4">Expires:</label>
          <div className="w-3/4 mr-4">
            <Field
              type="date"
              id={requirement.id}
              name="currencies"
              className="input-text input input-bordered input-primary w-full max-w-xs"
              value={
                currency ? dayjs(currency?.expiry).format("YYYY-MM-DD") : ""
              }
              onChange={handleExpiryChange}
              required={true}
            />
          </div>
            <label className="self-start flex py-3">
              Senior:
              <div className="flex-col">
                {requirement.hasSeniority && (
                  <Field
                    type="checkbox"
                    id={requirement.id}
                    name="seniority"
                    checked={currency?.seniority}
                    className="checkbox checkbox-secondary ml-4"
                    onChange={handleSeniorityChange}
                  />
                )}
              </div>
            </label>
        </div>
      </fieldset>
    </div>
  );
};

export default CurrencyFieldset;

import { Currency, Requirement } from "../../@types/trainee";
import { Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Prop = {
  requirement: Requirement;
  currency: Currency | undefined;
  handleExpiryChange: any;
  handleSeniorityChange: any;
  incrementCount: () => void;
};

const CurrencyFieldset = ({
  requirement,
  currency,
  handleExpiryChange,
  handleSeniorityChange,
  incrementCount,
}: Prop) => {
  useEffect(() => {
    incrementCount();
  }, []);

  return (
    <div className="flex justify-center">
      <fieldset className="card px-3 bg-primary text-secondary">
        <label className="card-title py-2 text-md xs:text-xl">
          {requirement.name}
        </label>
        <div className="flex flex-row text-md items-center pb-2 ">
          <div className="flex flex-col items-start xs:flex-row xs:items-center">
            <label className="mr-4">Expires:</label>
            <div className="w-3/4 mr-2">
              <Field
                as={DatePicker}
                type="date"
                id={requirement.id}
                dateFormat="dd/MM/yyyy"
                name="currencies"
                className="input-text text-primary input input-bordered input-primary w-full max-w-xs input-xs xs:input-md"
                value={currency?.expiry || null}
                selected={currency?.expiry || null}
                onChange={(value: Date) => {
                  handleExpiryChange(value, requirement.id);
                }}
                required={true}
              />
            </div>
          </div>
          <label
            {...(requirement.hasSeniority
              ? {
                  className: "flex items-center",
                }
              : { className: "flex items-center invisible" })}
          >
            <Field
              type="checkbox"
              id={requirement.id}
              name="seniority"
              checked={currency?.seniority}
              className="checkbox checkbox-secondary mx- checkbox-sm xs:checkbox-md"
              onChange={handleSeniorityChange}
              disabled={!requirement.hasSeniority ? true : false}
            />
            Senior
          </label>
        </div>
      </fieldset>
    </div>
  );
};

export default CurrencyFieldset;

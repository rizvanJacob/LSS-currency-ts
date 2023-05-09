import { Field, ErrorMessage } from "formik";

import { User } from "../../@types/user";

type Props = {
  user:   User;
  handleChange: any;
};

const AdminFieldSet = ({ user, handleChange }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <fieldset className="flex items-center">
        <label htmlFor="displayName" className="w-2/4">
          Display Name:
        </label>
          <div className="w-3/4">
            <Field
              type="text"
              id="displayName"
              name="displayName"
              className="input-text input input-bordered input-primary w-full max-w-xs"
              value={user.displayName}
              onChange={handleChange}
            />
            <div className="error-message text-error">
              <ErrorMessage name="displayName" />
            </div>
          </div>
      </fieldset>
    </div>
  );
};

export default AdminFieldSet;

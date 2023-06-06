import { Field, ErrorMessage } from "formik";

import { User } from "../../@types/user";
import { useEffect } from "react";

type Props = {
  user: User;
  handleChange: any;
  setIsLoadingAdmin?: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminFieldSet = ({ user, handleChange, setIsLoadingAdmin }: Props) => {
  useEffect(() => {
    if (user.displayName && setIsLoadingAdmin) {
      setIsLoadingAdmin(false);
    }

    if (!user.trainee?.id && setIsLoadingAdmin) {
      setIsLoadingAdmin(false);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center flex-col">
      <fieldset>
        <label htmlFor="displayName" className="w-2/4">
          Display Name:
        </label>
        <div className="w-4/4">
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

import { Field } from "formik";
import { NewUser } from "../../../../@types/user";

type Props = {
  user: NewUser;
  handleChange: any;
};

const AdminFieldSet = ({ user, handleChange }: Props) => {
  return (
    <fieldset>
      <label>
        Display Name:
        <Field
          type="text"
          id="displayName"
          name="displayName"
          value={user.displayName}
          onChange={handleChange}
        />
      </label>
    </fieldset>
  );
};

export default AdminFieldSet;

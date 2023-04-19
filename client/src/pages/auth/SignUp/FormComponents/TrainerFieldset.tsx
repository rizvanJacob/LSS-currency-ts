import { Field } from "formik";
import { NewUser } from "../../../../@types/UserProps";

type Props = {
  user: NewUser;
  handleChange: any;
};

const TrainerFieldset = ({ user, handleChange }: Props) => {
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

export default TrainerFieldset;

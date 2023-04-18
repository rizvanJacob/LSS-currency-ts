import { Link } from "react-router-dom";
import { UserProps } from "../../../@types/UserProps";

export default function EditUserButton({
  user,
}: {
  user: UserProps;
}): JSX.Element {
  return (
    <>
      <Link to={`${user.id}/edit`}>
        <button style={{ backgroundColor: "#00A0A0" }}>Edit</button>
      </Link>
    </>
  );
}

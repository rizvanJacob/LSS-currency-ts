import { Link } from "react-router-dom";
import { User } from "../../../@types/user";

export default function EditUserButton({
  user,
}: {
  user: User;
}): JSX.Element {
  return (
    <>
      <Link to={`${user.id}/edit`}>
        <button style={{ backgroundColor: "#00A0A0" }}>Edit</button>
      </Link>
    </>
  );
}

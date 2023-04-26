import { Link } from "react-router-dom";
import { User } from "../../../@types/user";
import Edit from "../../../assets/icons/editIcon.svg";
export default function EditUserButton({
  user,
}: {
  user: User;
}): JSX.Element {
  return (
      <Link to={`/users/${user.id}/edit`}>
        <button className="btn btn-circle">
          <img src={Edit} alt="edit"/>
        </button>
      </Link>
  );
}

import { Link } from "react-router-dom";
import { Training } from "../../../@types/training";
import Edit from "../../../assets/icons/editIcon.svg";
export default function EditUserButton({
  training,
}: {
  training: Training;
}): JSX.Element {
  return (
      <Link to={`/trainings/${training.id}/edit`}>
        <button className="btn btn-circle">
          <img src={Edit} alt="edit"/>
        </button>
      </Link>
  );
}

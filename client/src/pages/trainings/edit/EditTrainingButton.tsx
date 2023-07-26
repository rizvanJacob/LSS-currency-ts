import { Link } from "react-router-dom";
import { Training } from "../../../@types/training";
import Edit from "../../../assets/icons/editIcon.svg";
export default function EditUserButton({
  training,
}: {
  training: Training;
}): JSX.Element {
  return (
    <Link className="flex-0" to={`/trainings/${training.id}/edit`}>
      <button className="btn btn-square btn-sm btn-primary btn-outline shadow-md text-white">
        <img src={Edit} alt="edit" />
      </button>
    </Link>
  );
}

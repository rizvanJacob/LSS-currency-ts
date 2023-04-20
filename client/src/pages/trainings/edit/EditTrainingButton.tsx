import { Link } from "react-router-dom";
import { Training } from "../../../@types/training";

export default function EditUserButton({
  training,
}: {
  training: Training;
}): JSX.Element {
  return (
      <Link to={`/trainings/${training.id}/edit`}>
        <button style={{ backgroundColor: "#00A0A0" }}>✏️</button>
      </Link>
  );
}

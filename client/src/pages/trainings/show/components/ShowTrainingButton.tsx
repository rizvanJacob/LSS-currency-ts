import { Link } from "react-router-dom";
import { Training } from "../../../../@types/training";

export default function ShowTrainingButton({
  training,
}: {
  training: Training;
}): JSX.Element {
  return (
    <Link to={`${training.id}`}>
      <button style={{ backgroundColor: "#00A0A0" }}>➡️</button>
    </Link>
  );
}

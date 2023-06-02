import { Link } from "react-router-dom";
import { Training } from "../../../../@types/training";
import Enter from "../../../../assets/icons/enterIcon.svg";
export default function ShowTrainingButton({
  training,
}: {
  training: Training;
}): JSX.Element {
  return (
    <Link to={`${training.id}`}>
      <button className="btn btn-secondary btn-sm btn-square border-primary shadow-md">
        <img src={Enter} alt="enter" className="text-primary" />
      </button>
    </Link>
  );
}

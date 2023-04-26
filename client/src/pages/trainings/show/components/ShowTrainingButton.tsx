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
      <button className="btn btn-circle btn-outline">
        <img src={Enter} alt="enter"/>
      </button>
    </Link>
  );
}

import { Link } from "react-router-dom";

export default function CreateTrainingButton(): JSX.Element {
  return (
    <Link to={`new`}>
      <button className="btn btn-primary btn-block ">Add New Training</button>
    </Link>
  );
}

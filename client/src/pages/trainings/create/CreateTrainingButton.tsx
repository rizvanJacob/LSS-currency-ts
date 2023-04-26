import { Link } from "react-router-dom";

export default function CreateTrainingButton(): JSX.Element {
  return (
      <Link to={`new`}>
        <button style={{ backgroundColor: "#00A0A0" }}>➕ Training</button>
      </Link>
  );
}

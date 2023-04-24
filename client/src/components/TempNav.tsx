import { Link, useNavigate } from "react-router-dom";

const TempNav = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <nav>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <span> | </span>
      <Link to="/users">Users</Link>
      <span> | </span>
      <Link to="/trainees">Trainees</Link>
      <span> | </span>
      <Link to="/trainings">Trainings</Link>
    </nav>
  );
};

export default TempNav;

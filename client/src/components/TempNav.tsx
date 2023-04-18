import { Link } from "react-router-dom";

const TempNav = (): JSX.Element => {
  return (
    <nav>
      <Link to="/users">Users</Link>
      <span> | </span>
      <Link to="/trainees">Trainees</Link>
      <span> | </span>
      <Link to="/trainings">Trainings</Link>
    </nav>
  );
};

export default TempNav;

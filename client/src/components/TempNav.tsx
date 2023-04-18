import { Link } from "react-router-dom";

const TempNav = (): JSX.Element => {
  return (
    <nav>
      <Link to="/users">Users</Link>
      <Link to="/trainings">Trainings</Link>
    </nav>
  );
};

export default TempNav;

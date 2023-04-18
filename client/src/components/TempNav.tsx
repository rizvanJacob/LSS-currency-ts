import { Link } from "react-router-dom";

const TempNav = (): JSX.Element => {
  return (
    <nav>
      <Link to="/users">Users</Link> | <Link to="/trainees">Trainees</Link>
    </nav>
  );
};

export default TempNav;

import { Link, useNavigate } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <nav className="navbar bg-blue-300">
      <div className="flex-1">
        <button
          className="btn btn-ghost normal-case text-xl"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      <Link className="btn btn-ghost normal-case text-xl" to="/users">
        Users
      </Link>
      <Link className="btn btn-ghost normal-case text-xl" to="/trainees">
        Trainees
      </Link>
      <Link className="btn btn-ghost normal-case text-xl" to="/trainings">
        Trainings
      </Link>
    </nav>
  );
};

export default Navbar;

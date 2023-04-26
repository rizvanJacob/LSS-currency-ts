import { Link, useNavigate } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <nav className="navbar bg-cyan-800">
      <div className="flex-1">
        <button
          className="btn btn-ghost normal-case text-xl text-neutral-200"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      <Link
        className="btn btn-ghost normal-case text-xl text-neutral-200"
        to="/users"
      >
        Users
      </Link>
      <Link
        className="btn btn-ghost normal-case text-xl text-neutral-200"
        to="/trainees"
      >
        Trainees
      </Link>
      <Link
        className="btn btn-ghost normal-case text-xl text-neutral-200"
        to="/trainings"
      >
        Trainings
      </Link>
    </nav>
  );
};

export default Navbar;

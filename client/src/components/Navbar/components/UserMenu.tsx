import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <Link
      className="btn btn-ghost normal-case text-md text-neutral-200 sm:text-lg"
      to="/logout"
    >
      Logout
    </Link>
  );
};

export default UserMenu;

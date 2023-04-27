import { Link } from "react-router-dom";

type Prop = {
  to: string;
  display: string;
};

const NavLink = ({ to, display }: Prop) => {
  return (
    <Link
      className="btn btn-ghost normal-case text-md font-thin text-secondary sm:text-lg"
      to={to}
    >
      {display}
    </Link>
  );
};

export default NavLink;

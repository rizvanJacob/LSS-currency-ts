import { MenuItem } from "../Navbar";
import { Link } from "react-router-dom";

type Prop = {
  menuItems: MenuItem[];
  className: string;
};

const LargeMenu = ({ menuItems, className }: Prop) => {
  return (
    <div className={className}>
      {menuItems.map((i) => {
        return (
          <Link
            className="btn btn-ghost normal-case text-md text-neutral-200 sm:text-lg"
            to={i.path}
          >
            {i.name}
          </Link>
        );
      })}
    </div>
  );
};

export default LargeMenu;

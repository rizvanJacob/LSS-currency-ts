import MenuIcon from "../../../assets/icons/menuIcon.svg";
import Cross from "../../../assets/icons/cross.svg";
import { MenuItem } from "../Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
type Prop = {
  menuItems: MenuItem[];
  className: string;
};

const SmallMenu = ({ menuItems, className }: Prop) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={className}>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-circle btn-ghost">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        {isChecked && (
          <div
            tabIndex={0}
            className="dropdown-content menu bg-secondary rounded-box p-2 w-40 mt-3"
          >
            {menuItems.map((i, index) => {
              return (
                <Link
                  className="btn btn-ghost normal-case text-md justify-start"
                  to={i.path}
                  key={index}
                >
                  {i.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallMenu;

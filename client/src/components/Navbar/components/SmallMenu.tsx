import MenuIcon from "../../../assets/icons/menuIcon.svg";
import Cross from "../../../assets/icons/cross.svg";
import { MenuItem } from "../Navbar";
import { Link } from "react-router-dom";
import { useState } from "react"
type Prop = {
  menuItems: MenuItem[];
  className: string;
};

const SmallMenu = ({ menuItems, className }: Prop) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  console.log(isChecked);
  return (
    <div className={className}>
      <div className="dropdown dropdown-end">
        <label className="btn btn-circle swap swap-rotate ">
          <input type="checkbox" checked={isChecked} onChange={toggleCheckbox} />
          <img className="swap-off fill-current" src={MenuIcon} alt="Menu" />
          <img className="swap-on fill-current" src={Cross} alt="Cross" />
        </label>
        {isChecked && (
          <div
            tabIndex={0}
            className="dropdown-content menu bg-sky-50 rounded-box p-2 w-36 mt-3"
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

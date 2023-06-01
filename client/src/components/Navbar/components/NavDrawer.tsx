import { useState, useEffect } from "react";
import { MenuItem } from "../Navbar";
import NavLink from "./NavLink";
import { getMenuItems } from "../Navbar";
import UserMenu from "./UserMenu";

type props = {
  accountType: number;
  traineeId?: number;
  closeDrawer: () => void;
};
const NavDrawer = ({ accountType, traineeId = 0, closeDrawer }: props) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(getMenuItems(accountType, traineeId));
  }, [accountType, traineeId]);
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-secondary gap-1" onClick={closeDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-primary self-end"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
            transform="rotate(45, 12, 12)"
          />
        </svg>

        {menuItems.map((item, index) => (
          <NavLink key={index} display={item.name} to={item.path} />
        ))}
        <UserMenu />
      </ul>
    </div>
  );
};

export default NavDrawer;

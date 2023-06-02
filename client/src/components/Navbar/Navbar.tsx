import { useState, useEffect } from "react";
import NavLink from "./components/NavLink";
import UserMenu from "./components/UserMenu";

export type MenuItem = {
  name: string;
  path: string;
};

type props = {
  accountType: number;
  traineeId?: number;
  title: string;
  openDrawer: () => void;
};

const Navbar2 = ({
  accountType,
  traineeId = 0,
  title,
  openDrawer,
}: props): JSX.Element => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(getMenuItems(accountType, traineeId));
  }, [accountType, traineeId]);

  return (
    <div className="w-full navbar bg-primary">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          className="btn btn-square btn-ghost text-secondary"
          onClick={openDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 text-secondary font-bold text-xl">
        {title}
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {menuItems.map((item, index) => (
            <NavLink key={index} display={item.name} to={item.path} />
          ))}
          <UserMenu />
        </ul>
      </div>
    </div>
  );
};

export default Navbar2;

export const getMenuItems = (accountType: number, traineeId: number = 0) => {
  const lookup = [
    [],
    [
      { name: "Users", path: "/users" },
      { name: "Trainees", path: "/trainees" },
      { name: "Trainings", path: "/trainings" },
      { name: "Analytics", path: "/dashboard" },
    ] as MenuItem[],
    [
      traineeId !== 0
        ? { name: "My Currencies", path: `/trainees/${traineeId}` }
        : {},
      { name: "Users", path: "/users" },
      { name: "Trainees", path: "/trainees" },
      { name: "Trainings", path: "/trainings" },
    ] as MenuItem[],
    [{ name: "My Currencies", path: `/trainees/${traineeId}` }] as MenuItem[],
    [
      { name: "Trainees", path: "/trainees" },
      { name: "Trainings", path: "/trainings" },
    ] as MenuItem[],
  ];
  return lookup[accountType];
};

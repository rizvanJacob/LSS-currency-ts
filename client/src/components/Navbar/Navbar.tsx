import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmallMenu from "./components/SmallMenu";
import LargeMenu from "./components/LargeMenu";
import UserMenu from "./components/UserMenu";

export type MenuItem = {
  name: string;
  path: string;
};

type Prop = {
  accountType: number;
  traineeId?: number;
  title?: string;
};

const Navbar = ({ accountType, traineeId, title }: Prop): JSX.Element => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(getMenuItems(accountType, traineeId));
  }, [accountType, traineeId]);

  return (
    <nav className="navbar bg-primary max-h-10">
      <div className="navbar-start">
        <SmallMenu className="lg:hidden" menuItems={menuItems} />
        <LargeMenu className="hidden lg:block" menuItems={menuItems} />
      </div>
      <div className="navbar-center">
        <h1 className="text-lg lg:text-2xl font-extrabold text-secondary">
          {title}
        </h1>
      </div>
      <div className="navbar-end">
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;

const getMenuItems = (accountType: number, traineeId: number = 0) => {
  const lookup = [
    [],
    [
      { name: "Users", path: "/users" },
      { name: "Trainees", path: "/trainees" },
      { name: "Trainings", path: "/trainings" },
      { name: "Analytics", path: "/dashboard"}
    ] as MenuItem[],
    [
      traineeId !== 0 ? { name: "My Currencies", path: `/trainees/${traineeId}` } : {},
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

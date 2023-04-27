import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallMenu from "./components/SmallMenu";
import LargeMenu from "./components/LargeMenu";

export type MenuItem = {
  name: string;
  path: string;
};

type Prop = {
  accountType: number;
  traineeId?: number;
};

const Navbar = ({ accountType, traineeId }: Prop): JSX.Element => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(getMenuItems(accountType, traineeId));
  }, [accountType, traineeId]);

  return (
    <nav className="navbar bg-cyan-800 max-h-10">
      <div className="flex-1">
        <button
          className="btn btn-sm btn-ghost normal-case text-md text-neutral-200 sm:text-lg"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      <SmallMenu className="sm:hidden" menuItems={menuItems} />
      <LargeMenu className="hidden sm:block" menuItems={menuItems} />
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
      { name: "Log Out", path: "/logout" },
    ] as MenuItem[],
    [
      { name: "My Currencies", path: `/trainees/${traineeId}` },
      { name: "Trainees", path: "/trainees" },
      { name: "Trainings", path: "/trainings" },
      { name: "Log Out", path: "/logout" },
    ] as MenuItem[],
    [
      { name: "My Currencies", path: `/trainees/${traineeId}` },
      { name: "Log Out", path: "/logout" },
    ] as MenuItem[],
    [
      { name: "Trainees", path: "/trainees" },
      { name: "Trainings", path: "/trainings" },
      { name: "Log Out", path: "/logout" },
    ] as MenuItem[],
  ];
  return lookup[accountType];
};

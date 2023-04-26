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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "Log Out", path: "/logout" },
  ]);

  useEffect(() => {
    if (accountType === 1) {
      setMenuItems([
        { name: "Users", path: "/users" },
        { name: "Trainees", path: "/trainees" },
        { name: "Trainings", path: "/trainings" },
        ...menuItems,
      ]);
    } else if (accountType === 2) {
      setMenuItems([
        { name: "My Currencies", path: `/trainees/${traineeId}` },
        { name: "Trainees", path: "/trainees" },
        { name: "Trainings", path: "/trainings" },
        ...menuItems,
      ]);
    } else if (accountType === 3) {
      setMenuItems([
        { name: "My Currencies", path: `/trainees/${traineeId}` },
        ...menuItems,
      ]);
    } else if (accountType === 4) {
      setMenuItems([
        { name: "Trainees", path: "/trainees" },
        { name: "Trainings", path: "/trainings" },
        ...menuItems,
      ]);
    }
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

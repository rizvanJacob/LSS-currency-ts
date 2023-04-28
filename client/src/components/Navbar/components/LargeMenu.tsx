import { MenuItem } from "../Navbar";
import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";

type Prop = {
  menuItems: MenuItem[];
  className: string;
};

const LargeMenu = ({ menuItems, className }: Prop) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <button
        className="btn btn-ghost btn-square"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-secondary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      {menuItems.map((i, index) => {
        return <NavLink to={i.path} display={i.name} key={index} />;
      })}
    </div>
  );
};

export default LargeMenu;

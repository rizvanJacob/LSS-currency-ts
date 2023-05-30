import { MenuItem } from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
type Prop = {
  menuItems: MenuItem[];
  className: string;
};

const SmallMenu = ({ menuItems, className }: Prop) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-secondary rounded-box p-2 w-40 mt-3 drop-shadow-xl"
        >
          <button
            className="btn btn-ghost justify-start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
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
            return (
              <Link
                className="btn btn-ghost normal-case text-md text-primary justify-start"
                to={i.path}
                key={index}
              >
                {i.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmallMenu;

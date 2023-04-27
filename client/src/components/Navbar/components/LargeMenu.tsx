import { MenuItem } from "../Navbar";
import NavLink from "./NavLink";

type Prop = {
  menuItems: MenuItem[];
  className: string;
};

const LargeMenu = ({ menuItems, className }: Prop) => {
  return (
    <div className={className}>
      {menuItems.map((i, index) => {
        return <NavLink to={i.path} display={i.name} key={index} />;
      })}
    </div>
  );
};

export default LargeMenu;

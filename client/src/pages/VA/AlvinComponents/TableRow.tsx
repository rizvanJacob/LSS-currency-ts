//Good job importing the interface from the other component. 
//Typically we would put all the types into separate files in a types folder. 
import { user } from "../Alvin";

//good job typing your props.
interface TableRowProps {
  user: user;
}

const TableRow = ({ user }: TableRowProps) => {
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.openId}</td>
      <td>{user.displayName}</td>
      <td>{user.accountType}</td>
      <td>{user.accountTypes.name}</td>
    </tr>
  );
};

export default TableRow;

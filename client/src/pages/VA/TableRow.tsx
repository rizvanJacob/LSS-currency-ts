import { user } from "./Alvin";

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

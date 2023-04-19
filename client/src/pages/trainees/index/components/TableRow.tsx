import { Trainee } from "../../../../@types/trainee";
import { Link } from "react-router-dom";

type Prop = {
  trainee: Trainee;
  category: string;
  overallStatus: string;
};

const TableRow = ({ trainee, category, overallStatus }: Prop): JSX.Element => {
  return (
    <tr>
      <td>
        <Link to={`${trainee.id}`}>{trainee.callsign}</Link>
      </td>
      <td>{category}</td>
      <td>{overallStatus}</td>
      <td>{trainee.users.approved ? "Active" : "Inactive"}</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
  );
};

export default TableRow;

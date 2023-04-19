import { Trainee } from "../../../../@types/trainee";
import { Link } from "react-router-dom";

type Prop = {
  trainee: Trainee;
  category: string;
  status: string;
};

const TableRow = ({ trainee, category, status }: Prop): JSX.Element => {
  return (
    <tr>
      <td>
        <Link to={`${trainee.id}`}>{trainee.callsign}</Link>
      </td>
      <td>{category}</td>
      <td>{status}</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
  );
};

export default TableRow;

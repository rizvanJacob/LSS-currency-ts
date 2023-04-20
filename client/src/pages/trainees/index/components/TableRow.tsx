import { Trainee } from "../../../../@types/trainee";
import { Link } from "react-router-dom";

type Prop = {
  trainee: Trainee;
  category: string;
  overallStatus: string;
  deleteTrainee: any;
};

const TableRow = ({
  trainee,
  category,
  overallStatus,
  deleteTrainee,
}: Prop): JSX.Element => {
  return (
    <tr>
      <td>
        <Link to={trainee.id.toString()}>{trainee.callsign}</Link>
      </td>
      <td>{category}</td>
      <td>{overallStatus}</td>
      <td>{trainee.users.approved ? "Active" : "Inactive"}</td>
      <td>
        <Link to={`${trainee.id}/edit`}>
          <button>✏️</button>
        </Link>
      </td>
      <td>
        <button onClick={deleteTrainee(trainee.id)}>🗙</button>
      </td>
    </tr>
  );
};

export default TableRow;

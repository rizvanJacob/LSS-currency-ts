import { Trainee } from "../../../../@types/trainee";
import { Link } from "react-router-dom";
import Edit from "../../../../assets/icons/editIcon.svg";
import RedCross from "../../../../assets/icons/redCross.svg";
type Prop = {
  trainee: Trainee;
  category: string;
  overallStatus: string;
  deleteTrainee: any;
};

const TraineeTableRow = ({
  trainee,
  category,
  overallStatus,
  deleteTrainee,
}: Prop): JSX.Element => {
  return (
    <tr>
      <td>
        <Link className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950"
          to={trainee.id.toString()}>{trainee.callsign}
         </Link>
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden md:table-cell">{category}</td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">{overallStatus}</td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden md:table-cell">{trainee.users.approved ? "Active" : "Inactive"}</td>
      <div className="text-center">
      <td>
        <Link to={`${trainee.id}/edit`}>
          <button className="btn btn-circle px-1 py-2 text-center whitespace-nowrap">
            <img src={Edit} alt="edit"/>
          </button>
        </Link>
      </td>
      <td>
        <button className="px-1 py-2 text-center whitespace-nowrap btn btn-circle" onClick={deleteTrainee(trainee.id)}>
          <img src={RedCross} alt="redCross"/>
        </button>
      </td>
      </div>
    </tr>
  );
};

export default TraineeTableRow;

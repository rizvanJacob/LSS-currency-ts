import { Trainee } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { toTitleCase } from "../../../../utilities/stringManipulation";
import { Link } from "react-router-dom";

type Prop = {
  trainee: Trainee;
  handleChange: any;
  trainingComplete: boolean | undefined;
};
const TraineeListRow = ({ trainee, handleChange, trainingComplete }: Prop) => {
  return (
    <tr>
      <Link to={`/trainees/${trainee.id}`}>
        <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">{trainee.callsign}</td>
      </Link>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden md:table-cell">{trainee.categories.name}</td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden md:table-cell">{dayjs(trainee.currencies[0].expiry).format("DD MMM YY")}</td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">{toTitleCase(trainee.trainings?.[0].statuses?.name)}</td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
        {trainee.trainings?.[0].statuses?.name === "attended" && (
          <input
            name={String(trainee.id)}
            type="checkbox"
            onChange={handleChange}
            disabled={trainingComplete}
          />
        )}
      </td>
    </tr>
  );
};

export default TraineeListRow;

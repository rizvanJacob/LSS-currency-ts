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
        <td>{trainee.callsign}</td>
      </Link>
      <td>{trainee.categories.name}</td>
      <td>{dayjs(trainee.currencies[0].expiry).format("DD MMM YY")}</td>
      <td>{toTitleCase(trainee.trainings?.[0].statuses?.name)}</td>
      <td>
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

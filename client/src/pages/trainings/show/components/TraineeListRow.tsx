import { Trainee } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { toTitleCase } from "../../../../utilities/stringManipulation";
import { Link } from "react-router-dom";

type Prop = {
  trainee: Trainee;
};
const TraineeListRow = ({ trainee }: Prop) => {
  return (
    <tr>
      <Link to={`/trainees/${trainee.id}`}>
        <td>{trainee.callsign}</td>
      </Link>
      <td>{trainee.categories.name}</td>
      <td>{dayjs(trainee.currencies[0].expiry).format("DD MMM YY")}</td>
      <td>{toTitleCase(trainee.trainings?.[0].statuses?.name)}</td>
    </tr>
  );
};

export default TraineeListRow;

import { Trainee } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { toTitleCase } from "../../../../utilities/stringManipulation";

type Prop = {
  trainee: Trainee;
};
const TraineeListRow = ({ trainee }: Prop) => {
  return (
    <tr>
      <td>{trainee.callsign}</td>
      <td>{trainee.categories.name}</td>
      <td>{dayjs(trainee.currencies[0].expiry).format("DD MMM YY")}</td>
      <td>{toTitleCase(trainee.trainings?.[0].statuses?.name)}</td>
    </tr>
  );
};

export default TraineeListRow;

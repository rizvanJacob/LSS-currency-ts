import { Trainee } from "../../../../@types/trainee";
import TraineeTableRow from "./TraineeTableRow";

type Prop = {
  trainees: Trainee[];
  deleteTrainee: any;
};

const TraineesTable = ({ trainees, deleteTrainee }: Prop) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Callsign</th>
          <th>Category</th>
          <th>Overall Status</th>
          <th>Account Status</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trainees?.map((t) => (
          <TraineeTableRow
            trainee={t}
            key={t.id}
            category={t.categories.name}
            overallStatus={t.status || ""}
            deleteTrainee={deleteTrainee}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TraineesTable;

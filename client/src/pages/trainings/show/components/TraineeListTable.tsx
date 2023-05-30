import { Trainee } from "../../../../@types/trainee";
import TraineeListRow from "./TraineeListRow";

type Prop = {
  trainees: Trainee[];
  handleCheck: (event: React.FormEvent<HTMLInputElement>) => void;
  trainingComplete: boolean | undefined;
  trainingRequirement: number;
  trainingDate: Date;
};

const TraineeListTable = ({
  trainees,
  handleCheck,
  trainingComplete,
  trainingRequirement,
  trainingDate,
}: Prop) => {
  return (
    <table className="table w-full">
      <thead className="text-black">
        <tr>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider">
            Trainee
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider hidden md:table-cell">
            Category
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider hidden md:table-cell">
            Expiry
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider hidden xs:table-cell">
            Status
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider">
            Complete
          </th>
        </tr>
      </thead>
      <tbody>
        {trainees.map((t) => {
          return (
            <TraineeListRow
              trainee={t}
              key={t.id}
              handleChange={handleCheck}
              trainingComplete={trainingComplete}
              trainingRequirement={trainingRequirement}
              trainingDate={trainingDate}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default TraineeListTable;

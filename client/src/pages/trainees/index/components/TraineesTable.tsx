import { Trainee } from "../../../../@types/trainee";
import TraineeTableRow from "./TraineeTableRow";

type Prop = {
  trainees: Trainee[];
  deleteTrainee: any;
};

const emptyStatus = {
  message: "",
  className: "",
};

const TraineesTable = ({ trainees, deleteTrainee }: Prop) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden mx-auto scrollbar-hide">
      <table className="table w-full">
        <thead className="bg-blue-500 text-black">
          <tr>
            <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider overflow-x-hidden">
              Callsign
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider hidden md:table-cell">
              Category
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase hidden sm:table-cell tracking-wider">
              Overall Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium hidden 3xs:table-cell uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {trainees?.map((t) => {
            if (t.users.approved) {
              return (
                <TraineeTableRow
                  trainee={t}
                  key={t.id}
                  category={t.categories.name}
                  overallStatus={t.status || emptyStatus}
                  deleteTrainee={deleteTrainee}
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TraineesTable;

import { Account } from "../../../../../../server/src/constants";
import { Trainee } from "../../../../@types/trainee";
import { CurrentUserContext } from "../../../../App";
import TraineeListRow from "./TraineeListRow";
import {useContext} from "react"

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
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="overflow-x-auto scrollbar-hide">

    <table className="table table-compact md:table-normal w-full">
      <thead className="text-black">
        <tr>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase">
            Trainee
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase   md:table-cell">
            Category
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase   md:table-cell">
            Expiry
          </th>
          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase   xs:table-cell">
            Status
          </th>
          {currentUser?.accountType === Account.Trainer || Account.Admin &&

          <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase ">
            Complete
          </th>}
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
          </div>
  );
};

export default TraineeListTable;

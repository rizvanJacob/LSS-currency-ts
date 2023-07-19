import { Trainee } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { toTitleCase } from "../../../../utilities/stringManipulation";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../App";
import { TRAINEE_ACTIONS_ACCESS } from "../../../trainees/TraineesRoutes";
import { Account } from "../../../../../../server/src/constants";

type Prop = {
  trainee: Trainee;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  trainingComplete: boolean | undefined;
  trainingRequirement: number;
  trainingDate: Date;
};
const TraineeListRow = ({
  trainee,
  handleChange,
  trainingComplete,
  trainingRequirement,
  trainingDate,
}: Prop) => {
  const currentUser = useContext(CurrentUserContext);
  let showTraineesAsLinks = false;
  if (
    currentUser &&
    TRAINEE_ACTIONS_ACCESS.includes(Number(currentUser.accountType))
  ) {
    showTraineesAsLinks = true;
  }

  console.log(trainee);
  return (
    <tr>
      <th className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
        {showTraineesAsLinks ? (
          <Link
            to={`/trainees/${trainee.id}/book/${trainingRequirement}/?selected=${trainingDate}`}
            className="link"
          >
            {trainee.callsign}
          </Link>
        ) : (
          trainee.callsign
        )}
      </th>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950  md:table-cell">
        {trainee.categories.name}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950  md:table-cell">
        {dayjs(trainee.currencies[0].expiry).format("DD MMM YY")}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950  xs:table-cell">
        {toTitleCase(trainee.trainings?.[0].statuses?.name)}
      </td>
      {currentUser?.accountType === Account.Trainer || Account.Admin &&
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
        }
    </tr>
  );
};

export default TraineeListRow;

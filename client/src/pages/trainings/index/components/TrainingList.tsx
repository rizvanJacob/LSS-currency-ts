import dayjs from "dayjs";
import { Training } from "../../../../@types/training";
import TrainingTableRow from "../../components/TrainingTableRow";
import ShowTrainingButton from "../../show/components/ShowTrainingButton";


export type TrainingListProps = {
  trainings: Training[];
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
};
export default function TrainingList({
  trainings,
  setTrainings,
}: TrainingListProps): JSX.Element {
  

  return (
    <div className="overflow-y-auto overflow-x-hidden scrollbar-hide">
      <table className="table w-full">
        <TrainingTableRow />
        <tbody className="bg-white divide-y divide-gray-200">
          {trainings.map((training: Training) => {
            const bookedTrainees = training.trainees.filter((t) => t.status === 1);
            const waitlistTrainees = training.trainees.filter((t) => t.status === 6);
            return (
              <tr key={training.id} className="hover:bg-gray-100">
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
                  {training.requirements?.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden 2xs:table-cell">
                  {bookedTrainees.length}/
                  {training.capacity}, Q:{waitlistTrainees.length}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden sm:table-cell">
                  {dayjs(training.start).format("D MMM YY")}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden sm:table-cell">
                  {dayjs(training.start).format("HH:mm")}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden sm:table-cell">
                  {dayjs(training.end).format("D MMM YY")}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden sm:table-cell">
                  {dayjs(training.end).format("HH:mm")}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden sm:table-cell">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    disabled
                    checked={training.complete}
                  />
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
                  <ShowTrainingButton training={training} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

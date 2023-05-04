import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Training } from "../../../@types/training";
import TrainingTableRow from "../components/TrainingTableRow";
import ShowTrainingButton from "../show/components/ShowTrainingButton";

export type TrainingListProps = {
  trainings: Training[];
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
};

export default function TrainingList({
  trainings,
  setTrainings,
}: TrainingListProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="table w-screen">
        <TrainingTableRow />
        <tbody className="bg-white divide-y divide-gray-200">
          {trainings.map((training: Training) => {
            return (
              <tr key={training.id} className="hover:bg-gray-100">
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
                  {training.requirements.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
                  {training.capacity - Object.keys(training.trainees).length}/
                  {training.capacity}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden md:table-cell">
                  {dayjs(training.start).format("YYYY-MM-DD, HH:mm a")}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-black text-sm hidden md:table-cell">
                  {dayjs(training.end).format("YYYY-MM-DD, HH:mm a")}
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

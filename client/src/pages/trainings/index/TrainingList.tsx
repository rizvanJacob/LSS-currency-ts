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
    <>
      <table>
        <TrainingTableRow />
        <tbody>
          {trainings.map((training: Training) => {
            return (
              <tr key={training.id}>
                <td>{training.requirements.name}</td>
                <td>
                  {training.capacity - Object.keys(training.trainees).length}/
                  {training.capacity}
                </td>
                <td>{dayjs(training.start).format("YYYY-MM-DD, HH:mm a")}</td>
                <td>{dayjs(training.end).format("YYYY-MM-DD, HH:mm a")}</td>
                <td>
                  <ShowTrainingButton training={training} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

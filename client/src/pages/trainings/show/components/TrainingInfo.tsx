import { Training } from "../../../../@types/training";
import dayjs from "dayjs";
import EditTrainingButton from "../../edit/EditTrainingButton";
import DeleteTrainingButton from "../../delete/DeleteTrainingButton";
export type TrainingProps = {
  training: Training;
  setTraining: React.Dispatch<React.SetStateAction<Training>>;
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
};

export default function TrainingInfo({
  training,
  setTraining,
  setTrainings,
}: TrainingProps): JSX.Element {
  return (
    <div className="card w-full sm:w-96 text-white shadow-xl bg-primary m-auto mt-8 mb-8">
      <div className="card-body">
        <div>
          <h2 className="card-title">{training.requirements.name}</h2>
          <h2>Date: {dayjs(training.start).format("DD MMM YY")}</h2>
          <h2>Start: {dayjs(training.start).format("HH:mm")}</h2>
          <h2>End: {dayjs(training.end).format("HH:mm")}</h2>
          <h2>
            Vacancies:{" "}
            {training.capacity - Object.keys(training.trainees).length}/
            {training.capacity}
          </h2>
        </div>
        <div className="card-actions justify-end">
          <EditTrainingButton training={training} />
          <DeleteTrainingButton
            setTraining={setTraining}
            training={training}
            setTrainings={setTrainings}
          />
        </div>
      </div>
    </div>
  );
}

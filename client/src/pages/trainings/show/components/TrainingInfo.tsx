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
    <div className="card w-96 bg-base-100 shadow-xl bg-primary">
      <div className="card-body">
        <h2 className="card-title">{training.requirements.name}</h2>
        <h2>Start: {dayjs(training.start).format("YYYY-MM-DD, HH:mm a")}</h2>
        <h2>End: {dayjs(training.end).format("YYYY-MM-DD, HH:mm a")}</h2>
        <h2>
          Vacancies: {training.capacity - Object.keys(training.trainees).length}/
          {training.capacity}
      </h2>
      <div className="flex justify-start">
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

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
    <div className="card w-full 2xs:w-96 text-white shadow-xl bg-primary m-auto mt-8 mb-8">
      <div className="card-body">
        <h2 className="card-title">{training.requirements.name}</h2>
        <div className="text-left">
          <p>Date: {dayjs(training.start).format("DD MMM YY")}</p>
          <p>Start: {dayjs(training.start).format("HH:mm")}</p>
          <p>End: {dayjs(training.end).format("HH:mm")}</p>
        <p>
          Vacancies: {training.capacity - Object.keys(training.trainees).length}
          /{training.capacity}
        </p>
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

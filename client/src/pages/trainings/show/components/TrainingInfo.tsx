import { Training } from "../../../../@types/training";
import dayjs from "dayjs";
import EditTrainingButton from "../../edit/EditTrainingButton";
import DeleteTrainingButton from "../../delete/DeleteTrainingButton";
import { useContext } from "react";
import { CurrentUser } from "../../../../@types/currentUser";
import { CurrentUserContext } from "../../../../App";
import { CHANGE_TRAINING_ACCESS } from "../../routes/TrainingRoutes";
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
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const showEditControls =
    currentUser && CHANGE_TRAINING_ACCESS.includes(currentUser?.accountType);

  return (
    <div className="card w-full 2xs:w-96 text-primary shadow-xl bg-secondary m-auto mt-8 mb-8">
      <div className="card-body">
        <h2 className="card-title">{training.requirements.name}</h2>
        <div className="text-left">
          <p>
            <span className="font-semibold">Date: </span>
            {dayjs(training.start).format("DD MMM YY")}
          </p>
          <p>
            <span className="font-semibold">Start: </span>
            {dayjs(training.start).format("HH:mm")}
          </p>
          <p>
            <span className="font-semibold">End: </span>
            {dayjs(training.end).format("HH:mm")}
          </p>
          <p>
            <span className="font-semibold">Vacancies: </span>
            {training.capacity - Object.keys(training.trainees).length}/
            {training.capacity}
          </p>
          <p>
            <span className="font-semibold">Instructions: </span>
            {training.instruction}
          </p>
        </div>
        {showEditControls && (
          <div className="card-actions justify-end">
            <EditTrainingButton training={training} />
            <DeleteTrainingButton
              setTraining={setTraining}
              training={training}
              setTrainings={setTrainings}
            />
          </div>
        )}
      </div>
    </div>
  );
}

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

  const bookedTrainees = training.trainees.filter((t) => {
    if (!t.trainees?.trainings) return false;
    return [1, 2, 3].includes(t.status || 0);
  });

  return (
    <div className="card w-full xs:w-96 text-primary shadow-xl bg-secondary mx-auto">
      <div className="card-body text-left">
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
          <span className="font-semibold">Occupancy: </span>
          {bookedTrainees.length}/{training.capacity}
        </p>
        <p>
          <span className="font-semibold">Instructions: </span>
          {training.instruction}
        </p>
        {showEditControls && (
          <>
            <div className="h-6 flex items-start align-center gap-x-1 flex-wrap grow">
              <span className="font-semibold flex-none">Passphrase: </span>
              <label className="swap">
                <input type="checkbox" />
                <div className="swap-on">{training.passphrase}</div>
                <div className="swap-off">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </div>
              </label>
            </div>
            <div className="card-actions justify-end">
              <EditTrainingButton training={training} />
              <DeleteTrainingButton
                setTraining={setTraining}
                training={training}
                setTrainings={setTrainings}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

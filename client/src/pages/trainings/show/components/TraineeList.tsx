import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getRequest from "../../../../utilities/getRequest";
import TraineeListRow from "./TraineeListRow";
import { Trainee } from "../../../../@types/trainee";
import ProgressBar from "../../../../components/ProgressBar";
import { buildFullUrl } from "../../../../utilities/stringManipulation";
import DialogModal from "../../../../components/DialogModal";
import { CurrentUserContext } from "../../../../App";
import { CurrentUser } from "../../../../@types/currentUser";
import { CHANGE_TRAINING_ACCESS } from "../../routes/TrainingRoutes";

type Prop = {
  trainingId: number;
  trainingComplete: boolean | undefined;
  setTrainingComplete: any;
};

const TraineeList = ({
  trainingId,
  trainingComplete,
  setTrainingComplete,
}: Prop) => {
  const [isLoading, setIsLoading] = useState(true);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [completedTrainees, setCompletedTrainees] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const showEditControls =
    currentUser && CHANGE_TRAINING_ACCESS.includes(currentUser.accountType);

  useEffect(() => {
    getRequest(`/api/trainees/?training=${trainingId}`, setTrainees).then(
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const handleCheck = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;

    if (checked) {
      setCompletedTrainees([...completedTrainees, Number(name)]);
    } else {
      setCompletedTrainees(
        completedTrainees.filter((t) => {
          return t !== Number(name);
        })
      );
    }
  };

  const confirmSubmit = async () => {
    console.log("submit form");
    setIsLoading(true);
    await fetch(buildFullUrl(`/api/trainings/complete/${trainingId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedTrainees),
    });
    await getRequest(`/api/trainees/?training=${trainingId}`, setTrainees);
    setCompletedTrainees([]);
    setTrainingComplete();
    setIsLoading(false);
  };

  return isLoading ? (
    <ProgressBar />
  ) : (
    <>
      <form
        className="text-center"
        onSubmit={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <table className="table w-full">
          <thead className="text-black">
            <tr>
              <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider">
                Trainee
              </th>
              <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider hidden md:table-cell">
                Category
              </th>
              <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider hidden md:table-cell">
                Expiry
              </th>
              <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider hidden xs:table-cell">
                Status
              </th>
              <th className="px-6 py-3 text-center text-base text-bold font-medium uppercase tracking-wider">
                Complete
              </th>
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
                />
              );
            })}
          </tbody>
        </table>
        {showEditControls && (
          <button
            className="btn btn-block btn-primary mt-4 item-left"
            type="submit"
            disabled={trainingComplete}
          >
            {trainingComplete ? "Completed" : "Complete"}
          </button>
        )}
      </form>
      {showModal && (
        <DialogModal
          title="Complete Training?"
          message="Are you sure you want to complete this training? All trainees marked complete will have their currencies updated. This action cannot be undone."
          isOpened={showModal}
          proceedButtonText="Complete"
          onProceed={confirmSubmit}
          closeButtonText="Cancel"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TraineeList;

import { useContext, useEffect, useState } from "react";
import getRequest from "../../../../utilities/getRequest";
import { Trainee } from "../../../../@types/trainee";
import ProgressBar from "../../../../components/ProgressBar";
import { buildFullUrl } from "../../../../utilities/stringManipulation";
import DialogModal from "../../../../components/DialogModal";
import { CurrentUserContext } from "../../../../App";
import { CurrentUser } from "../../../../@types/currentUser";
import { CHANGE_TRAINING_ACCESS } from "../../routes/TrainingRoutes";
import TraineeListTable from "./TraineeListTable";

type Prop = {
  trainingId: number;
  relatedTraining: number | undefined;
  name: string | undefined;
  relatedName: string | undefined;
  trainingComplete: boolean | undefined;
  setTrainingComplete: any;
  trainingRequirement: number;
  relatedRequirement: number | undefined;
  trainingDate: Date;
};

const TraineeList = ({
  trainingId,
  trainingComplete,
  setTrainingComplete,
  relatedTraining,
  name,
  relatedName,
  trainingRequirement,
  relatedRequirement = 0,
  trainingDate,
}: Prop) => {
  const [isLoading, setIsLoading] = useState(true);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [relatedTrainees, setRelatedTrainees] = useState<Trainee[]>([]);
  const [completedTrainees, setCompletedTrainees] = useState<number[]>([]);
  const [relatedCompletedTrainees, setRelatedCompletedTrainees] = useState<
    number[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const showEditControls =
    currentUser && CHANGE_TRAINING_ACCESS.includes(currentUser.accountType);

  useEffect(() => {
    const fetchPromises = [
      getRequest(`/api/trainings/${trainingId}/trainees`, setTrainees),
    ];
    if (relatedTraining) {
      fetchPromises.push(
        getRequest(
          `/api/trainings/${relatedTraining}/trainees`,
          setRelatedTrainees
        )
      );
    }
    Promise.all(fetchPromises).then(() => {
      setIsLoading(false);
    });
  }, [trainingComplete]);

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

  const handleRelatedCheck = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;

    if (checked) {
      setRelatedCompletedTrainees([...relatedCompletedTrainees, Number(name)]);
    } else {
      setRelatedCompletedTrainees(
        relatedCompletedTrainees.filter((t) => {
          return t !== Number(name);
        })
      );
    }
  };

  const confirmSubmit = async () => {
    console.log("submit form");
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const putPromises = [
      fetch(buildFullUrl(`/api/trainings/complete/${trainingId}`), {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completedTrainees),
      }),
    ];
    if (relatedTraining) {
      putPromises.push(
        fetch(buildFullUrl(`/api/trainings/complete/${relatedTraining}`), {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(relatedCompletedTrainees),
        })
      );
    }
    await Promise.all(putPromises);

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
        {relatedTraining && <h4 className="divider">{name}</h4>}
        <TraineeListTable
          trainees={sortTrainees(trainees)}
          handleCheck={handleCheck}
          trainingComplete={trainingComplete}
          trainingRequirement={trainingRequirement}
          trainingDate={trainingDate}
        />
        {relatedTraining && (
          <>
            <h4 className="divider">{relatedName}</h4>
            <TraineeListTable
              trainees={relatedTrainees}
              handleCheck={handleRelatedCheck}
              trainingComplete={trainingComplete}
              trainingRequirement={relatedRequirement}
              trainingDate={trainingDate}
            />
          </>
        )}
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

const sortTrainees = (trainees: Trainee[]) => {
  return trainees.sort((a, b) => {
    if (!a.trainings) return 1;
    if (!b.trainings) return 1;

    return a.trainings[0].status - b.trainings[0].status;
  });
};

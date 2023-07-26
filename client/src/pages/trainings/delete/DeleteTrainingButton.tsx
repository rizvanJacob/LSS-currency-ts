import deleteRequest from "../../../utilities/deleteRequest";
import { Training } from "../../../@types/training";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
import { useState, useContext } from "react";
import RedCross from "../../../assets/icons/redCross.svg";
import DialogModal from "../../../components/DialogModal";
import dayjs from "dayjs";
export default function DeleteTrainingButton({
  setTraining,
  training,
  setTrainings,
}: {
  setTraining: React.Dispatch<React.SetStateAction<Training>>;
  training: Training;
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
}): JSX.Element {
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteRequest(`/api/trainings/${id}`, training.id, setTrainings);
      navigate("/trainings", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex-0 btn btn-square btn-outline btn-sm btn-primary text-white shadow-md"
      >
        <img src={RedCross} alt="redCross" />
      </button>
      {showModal && (
        <DialogModal
          title="Delete this training?"
          message={`Are you sure you want to delete ${
            training.requirements?.name || "training"
          } on ${dayjs(training.start).format(
            "D MMM"
          )}? This action cannot be undone.`}
          isOpened={showModal}
          proceedButtonText="Delete"
          onProceed={() => handleDeleteClick(training.id)}
          closeButtonText="Cancel"
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}

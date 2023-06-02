import { useState } from "react";
import putRequest from "../../../../utilities/putRequest";
import ConfirmPopup from "../../../../components/ConfirmPopup";
import DialogModal from "../../../../components/DialogModal";

type Prop = {
  traineeId: number;
  requirementId: number;
  handleSelfComplete: (currencyId: number, newExpiry: Date) => void;
};

const SelfCompleteButton = ({
  traineeId,
  requirementId,
  handleSelfComplete,
}: Prop) => {
  const [disableButton, setDisableButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setDisableButton(true);
    putRequest(`/api/trainees/${traineeId}/complete/${requirementId}`, {
      completedOn: new Date(),
    }).then((response: any) => {
      handleSelfComplete(requirementId, response.data.expiry);
      setDisableButton(false);
    });
  };

  return (
    <>
      <button
        className="break-words btn btn-sm btn-secondary border-primary shadow-md"
        disabled={disableButton}
        onClick={handleClick}
      >
        Complete
      </button>
      {showModal && (
        <DialogModal
          title="Complete recurrency requirements?"
          isOpened={true}
          onProceed={handleConfirm}
          onClose={() => {
            setShowModal(false);
          }}
          message="Are you sure you want to complete this recurrency requirement?"
        />
      )}
    </>
  );
};

export default SelfCompleteButton;

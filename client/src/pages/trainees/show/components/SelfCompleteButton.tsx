import { useState } from "react";
import putRequest from "../../../../utilities/putRequest";
import ConfirmPopup from "../../../../components/ConfirmPopup";

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
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
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
        className="break-words btn btn-sm btn-outline"
        disabled={disableButton}
        onClick={handleClick}
      ></button>
      <ConfirmPopup
        open={popupOpen}
        id="modal-1"
        header="Confirm self-completion?"
        message="Are you sure you have fulfilled all requirements to refresh this currency?"
        buttonText="Yes"
      />
    </>
  );
};

export default SelfCompleteButton;

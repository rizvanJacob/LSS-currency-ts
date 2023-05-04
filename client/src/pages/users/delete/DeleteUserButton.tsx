import deleteRequest from "../../../utilities/deleteRequest";
import RedCross from "../../../assets/icons/redCross.svg";
import { User } from "../../../@types/user";
import DialogModal from "../../../components/DialogModal";
import { useState } from "react";

export default function DeleteUserButton({
  setUsers,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User;
}): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteRequest(`api/users/${user.id}`, user.id, setUsers);
      // console.log("simulate delete");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={handleClick} className="btn btn-circle btn-outline">
        <img src={RedCross} alt="redCross" />
      </button>
      {showModal && (
        <DialogModal
          title="Delete this user?"
          message={`Are you sure you want to delete ${user.displayName}? This action cannot be undone.`}
          isOpened={showModal}
          proceedButtonText="Delete"
          onProceed={handleConfirmDelete}
          closeButtonText="Cancel"
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}

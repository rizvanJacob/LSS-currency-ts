import deleteRequest from "../../../utilities/deleteRequest";
import RedCross from "../../../assets/icons/redCross.svg";
import { User } from "../../../@types/user";
import DialogModal from "../../../components/DialogModal";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../App";

export default function DeleteUserButton({
  setUsers,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User;
}) {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteRequest(`/api/users/${user.id}`, user.id, setUsers);
    } catch (err) {
      console.error(err);
    }
  };

  return currentUser?.id !== user.id ? (
    <>
      <button onClick={handleClick} className="btn btn-circle btn-outline btn-md">
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
  ) : (
    <></>
  );
}

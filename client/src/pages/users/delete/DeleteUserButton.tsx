import deleteRequest from "../../../utilities/deleteRequest";
import { UserProps } from "../../../@types/UserProps";
export default function DeleteUserButton({
  setUsers,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
  user: UserProps;
}): JSX.Element {
  // Handle click event for deleting a medicine
  const handleDeleteClick = async (id: string) => {
    try {
      await deleteRequest(`api/users/${id}`, user.openId, setUsers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <td>
      <button
        onClick={() => handleDeleteClick(user.openId)} //"user.id"
        style={{ backgroundColor: "#E42313" }}
      >
        Delete
      </button>
    </td>
  );
}

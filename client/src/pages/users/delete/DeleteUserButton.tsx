import deleteRequest from "../../../utilities/deleteRequest";
import { User } from "../../../@types/user";
export default function DeleteUserButton({
  setUsers,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User;
}): JSX.Element {
  // Handle click event for deleting a medicine
  const handleDeleteClick = async (id: number) => {
    try {
      await deleteRequest(`api/users/${id}`, user.id, setUsers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <td>
      <button
        onClick={() => handleDeleteClick(user.id)} //"user.id"
        style={{ backgroundColor: "#E42313" }}
      >
        ❌
      </button>
    </td>
  );
}

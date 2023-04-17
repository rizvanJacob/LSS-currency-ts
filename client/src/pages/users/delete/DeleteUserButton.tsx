import deleteRequest from "../../../utilities/getRequest";
import { UserProps } from "../index/AllUsersPage";
export default function DeleteUserButton({setUsers, user}: {setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>, user: UserProps}): JSX.Element {
    // Handle click event for deleting a medicine
    const handleDeleteClick = async (id: number) => {
        try {
            await deleteRequest(`api/users/${id}`, setUsers)
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <td>
      <button
        onClick={() => handleDeleteClick(user.id)} //"user.id"
        style={{ backgroundColor: '#E42313' }}>
        Delete
      </button>
    </td>
  );
}
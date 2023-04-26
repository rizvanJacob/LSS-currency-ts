import deleteRequest from "../../../utilities/deleteRequest";
import RedCross from "../../../assets/icons/redCross.svg";
import { User } from "../../../@types/user";
export default function DeleteUserButton({
  setUsers,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User;
}): JSX.Element {
  const handleDeleteClick = async (id: number) => {
    try {
      await deleteRequest(`api/users/${id}`, user.id, setUsers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <button
        onClick={() => handleDeleteClick(user.id)} 
        className="btn btn-circle"
      >
        <img src={RedCross} alt="redCross"/>
      </button>
  );
}

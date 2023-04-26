
import EditUserButton from "../edit/EditUserButton";
import DeleteUserButton from "../delete/DeleteUserButton";
import { User } from "../../../@types/user";
import UserTableRow from "../components/UserTableRow"

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function UnapprovedUsersList({
  users,
  setUsers,
}: UsersListProps): JSX.Element {
  return (
    <>
      <table>
        <UserTableRow />
        <tbody>
          {users.map((user: User) => {
            return (
              <tr key={user.id}>
                <td>{user.displayName}</td>
                <td>{user.accountTypes?.name}</td>
                <td><EditUserButton user={user} /></td>
                <td><DeleteUserButton setUsers={setUsers} user={user} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

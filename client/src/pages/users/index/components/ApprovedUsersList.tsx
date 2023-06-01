import EditUserButton from "../../edit/EditUserButton";
import DeleteUserButton from "../../delete/DeleteUserButton";
import { User } from "../../../../@types/user";
import UserTableRow from "../../components/UserTableRow";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../App";

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function ApprovedUsersList({
  users,
  setUsers,
}: UsersListProps): JSX.Element {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="overflow-y-auto overflow-x-clip flex-1 scrollbar-hide">
      <table className="table w-full">
        <UserTableRow />
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: User) => {
            const accountType = user.accountTypes?.name;
            let accountTypeClass = "";
            switch (accountType) {
              case "Admin":
                accountTypeClass = "text-amber-950";
                break;
              case "Trainee Admin":
                accountTypeClass = "text-lime-950";
                break;
              case "Trainee":
                accountTypeClass = "text-cyan-950";
                break;
              case "Trainer":
                accountTypeClass = "text-pink-950";
            }
            return (
              <tr key={user.id} className="hover:bg-gray-100 h-max">
                <td className="px-2 py-4 whitespace-nowrap text-center overflow-clip text-sm font-medium text-slate-950">
                  {user.displayName}
                </td>
                <td
                  className={`px-2 py-4 whitespace-nowrap text-center text-sm hidden md:table-cell ${accountTypeClass}`}
                >
                  {accountType}
                </td>
                {currentUser?.id !== user.id ? (
                  <td className="btn-group py-2 text-center whitespace-nowrap flex items-center justify-center">
                    <EditUserButton user={user} />
                    <DeleteUserButton setUsers={setUsers} user={user} />
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import EditUserButton from "../edit/EditUserButton";
import DeleteUserButton from "../delete/DeleteUserButton";
import { User } from "../../../@types/user";
import UserTableRow from "../components/UserTableRow";

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function UnapprovedUsersList({
  users,
  setUsers,
}: UsersListProps): JSX.Element {
  return (
    <div className="">
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
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950">
                  {user.displayName}
                </td>
                <td
                  className={`px-2 py-4 whitespace-nowrap text-center text-sm hidden md:table-cell ${accountTypeClass}`}
                >
                  {accountType}
                </td>
                <td className="px-1 py-2 text-center whitespace-nowrap flex items-center justify-evenly">
                  <EditUserButton user={user} />
                  <DeleteUserButton setUsers={setUsers} user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

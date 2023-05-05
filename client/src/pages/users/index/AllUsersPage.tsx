import { useState, useEffect, useContext } from "react";
import ApprovedUsersList from "./components/ApprovedUsersList";
import getRequest from "../../../utilities/getRequest";
import { User, UserFilterOptions } from "../../../@types/user";
import UnapprovedUsersList from "./components/UnapprovedUsersList";
import ProgressBar from "../../../components/ProgressBar";
import { CurrentUser } from "../../../@types/currentUser";
import { TitleContext } from "../../../App";
import UsersFilterControls from "./components/UsersFilterControls";

export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [filterOptions, setFilterOptions] = useState<UserFilterOptions>({
    accountType: 0,
  });
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) {
      setTitle("Users Index");
    }
    getRequest(`/api/users`, setUsers);
  }, []);

  const notApprovedUsers = users.filter((user) => !user.approved);
  const approvedUsers = users.filter((user) => user.approved);

  return users.length ? (
    <>
      {notApprovedUsers.length > 0 ? (
        <>
          <h1 className="text-lg font-bold self-start">Pending approval:</h1>
          <UnapprovedUsersList
            users={notApprovedUsers as User[]}
            setUsers={setUsers as React.Dispatch<React.SetStateAction<User[]>>}
          />
        </>
      ) : (
        <></>
      )}

      <h1 className="text-lg font-bold self-start"> Approved Users:</h1>
      <UsersFilterControls
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        users={approvedUsers}
      />
      <ApprovedUsersList
        users={
          filterOptions.accountType
            ? approvedUsers.filter(
                (user) => user.accountType === filterOptions.accountType
              )
            : approvedUsers
        }
        setUsers={setUsers}
      />
    </>
  ) : (
    <ProgressBar />
  );
}

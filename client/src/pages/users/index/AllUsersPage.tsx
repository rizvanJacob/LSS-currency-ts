import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { User, UserFilterOptions } from "../../../@types/user";
import ApprovedUsersList from "./components/ApprovedUsersList";
import UnapprovedUsersList from "./components/UnapprovedUsersList";
import { TitleContext, FilterContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";
import UsersFilterControls from "./components/UsersFilterControls";
import PendingCollapseHeader from "./components/PendingCollapseHeader";

export default function AllUsersPage(): JSX.Element {
  const { filterOptions } = useContext(FilterContext);
  const [users, setUsers] = useState<User[]>([]);
  const [showUnapproved, setShowUnapproved] = useState<boolean>(true);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Users Index");
    getRequest(`/api/users`, setUsers);
  }, []);

  const notApprovedUsers = users.filter((user) => !user.approved);
  const approvedUsers = users.filter((user) => user.approved);

  return users.length ? (
    <>
      {notApprovedUsers.length > 0 ? (
        <div className="collapse">
          <input
            type="checkbox"
            checked={showUnapproved}
            onChange={() => {
              setShowUnapproved(!showUnapproved);
            }}
          />
          <PendingCollapseHeader showUnapproved={showUnapproved} />
          <div className="collapse-content p-0 overflow-auto flex-1 scrollbar-hide">
            <UnapprovedUsersList
              users={notApprovedUsers as User[]}
              setUsers={
                setUsers as React.Dispatch<React.SetStateAction<User[]>>
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <h1 className="text-lg font-bold self-start py-4"> Approved Users:</h1>
      <UsersFilterControls users={approvedUsers} />
      <ApprovedUsersList
        users={filterUsers(approvedUsers, filterOptions.usersFilter)}
        setUsers={setUsers}
      />
    </>
  ) : (
    <ProgressBar />
  );
}

//utility function to filter the users based on a filter options object
const filterUsers = (users: User[], filterOptions: UserFilterOptions) => {
  return users.filter((user) => {
    let accountTypeFilter;
    if (filterOptions.accountType) {
      accountTypeFilter = user.accountType === filterOptions.accountType;
    } else {
      accountTypeFilter = true;
    }
    return accountTypeFilter;
  });
};

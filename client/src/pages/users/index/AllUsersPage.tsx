import { useState, useEffect, useContext } from "react";
import ApprovedUsersList from "./components/ApprovedUsersList";
import getRequest from "../../../utilities/getRequest";
import { User, UserFilterOptions } from "../../../@types/user";
import UnapprovedUsersList from "./components/UnapprovedUsersList";
import ProgressBar from "../../../components/ProgressBar";
import { TitleContext } from "../../../App";
import UsersFilterControls from "./components/UsersFilterControls";

export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [filterOptions, setFilterOptions] = useState<UserFilterOptions>({
    accountType: 0,
  });
  const [showUnapproved, setShowUnapproved] = useState<boolean>(true);
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
        <div className="collapse">
          <input
            type="checkbox"
            checked={showUnapproved}
            onChange={() => {
              setShowUnapproved(!showUnapproved);
            }}
          />
          <div className="collapse-title p-0 flex items-center h-min">
            <h1 className="text-lg font-bold text-left flex-1">
              Pending approval:
            </h1>
            <label className="swap swap-rotate h-min px-2">
              <input type="checkbox" checked={showUnapproved} readOnly />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="swap-on w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="swap-off w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </label>
          </div>
          <div className="collapse-content p-0">
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

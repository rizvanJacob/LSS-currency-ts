import { useState, useEffect, useContext } from "react";
import ApprovedUsersList from "./ApprovedUsersList";
import getRequest from "../../../utilities/getRequest";
import { User } from "../../../@types/user";
import UnapprovedUsersList from "./UnapprovedUsersList";
import ProgressBar from "../../../components/ProgressBar";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";

export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getRequest(`/api/users`, setUsers);
  }, []);

  const notApprovedUsers = users.filter((user) => !user.approved);
  const approvedUsers = users.filter((user) => user.approved);

  return users.length ? (
    <div className="p-4 space-y-4">
      {notApprovedUsers.length > 0 ? (
        <>
          <h1 className="text-lg font-bold">Pending approval:</h1>
          <UnapprovedUsersList
            users={notApprovedUsers as User[]}
            setUsers={setUsers as React.Dispatch<React.SetStateAction<User[]>>}
          />
        </>
      ) : (
        <></>
      )}

      <h1 className="text-lg font-bold"> Approved Users:</h1>
      <ApprovedUsersList
        users={approvedUsers as User[]}
        setUsers={setUsers as React.Dispatch<React.SetStateAction<User[]>>}
      />
    </div>
  ) : (
    <ProgressBar />
  );
}

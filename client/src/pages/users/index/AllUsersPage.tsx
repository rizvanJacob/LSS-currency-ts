import { useState, useEffect, useContext } from "react";
import ApprovedUsersList from "./ApprovedUsersList";
import getRequest from "../../../utilities/getRequest";
import { SimpleLookup } from "../../../@types/lookup";
import { User } from "../../../@types/user";
import UnapprovedUsersList from "./UnapprovedUsersList";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
import { useNavigate } from "react-router-dom";

export default function AllUsersPage(): JSX.Element {
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getRequest(`/api/users`, setUsers);
  }, []);

  const notApprovedUsers = users.filter((user) => !user.approved);
  const approvedUsers = users.filter((user) => user.approved);

  return (
    <>
      {users.length > 0 ? (
        <>
          <h1>Pending approval:</h1>
          <UnapprovedUsersList
            users={notApprovedUsers as User[]}
            setUsers={setUsers as React.Dispatch<React.SetStateAction<User[]>>}
          />
          <h1> Approved Users:</h1>
          <ApprovedUsersList
            users={approvedUsers as User[]}
            setUsers={setUsers as React.Dispatch<React.SetStateAction<User[]>>}
          />
        </>
      ) : (
        <>
          <h1>Fetching Users</h1>
          <p>
            <progress className="progress w-56" />
          </p>
        </>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import ApprovedUsersList from "./ApprovedUsersList";
import getRequest from "../../../utilities/getRequest";
import { SimpleLookup } from "../../../@types/lookup";
import { User } from "../../../@types/user";
import FilteredUsersList from "./UnapprovedUsersList"

export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[] | null>(null);

  useEffect(() => {
    getRequest(`/api/users`, setUsers);
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
  }, []);

  const notApprovedUsers = users.filter(user => !user.approved);
  const approvedUsers = users.filter(user => user.approved);

  return (
    <>
      {users.length > 0 ? (
        <>
          <h1>Pending approval:</h1>
          <FilteredUsersList
            users={notApprovedUsers as User[]}
            setUsers={
              setUsers as React.Dispatch<React.SetStateAction<User[]>>
            }
            accountTypes = {accountTypes as SimpleLookup[]}
          />
          <h1> Approved Users:</h1>
          <ApprovedUsersList
            users={approvedUsers as User[]}
            setUsers={
              setUsers as React.Dispatch<React.SetStateAction<User[]>>
            }
            accountTypes = {accountTypes as SimpleLookup[]}
          />
        </>
      ) : (
        <>
          <p>
            <progress />
          </p>
        </>
      )}
    </>
  );
}

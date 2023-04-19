import { useState, useEffect } from "react";
import UsersList from "./UsersList";
import getRequest from "../../../utilities/getRequest";
import { SimpleLookup } from "../../../@types/lookup";
import { User } from "../../../@types/user";


export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[] | null>(null);

  useEffect(() => {
    getRequest(`/api/users`, setUsers);
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
  }, []);

  return (
    <>
      <h1> Display all users for Admin to see</h1>
      {users.length > 0 ? (
        <>
          <UsersList
            users={users as User[]}
            setUsers={
              setUsers as React.Dispatch<React.SetStateAction<User[]>>
            }
            accountTypes = {accountTypes as SimpleLookup[]}
          />
        </>
      ) : (
        <>
          <p>
            {" "}
            <progress />
          </p>
        </>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import UsersList from "./UsersList";
import getRequest from "../../../utilities/getRequest";
import { User } from "../../../@types/user";

export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getRequest(`/api/users`, setUsers);
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
          />
        </>
      ) : (
        <>
          <p>
            {" "}
            No users found <progress />
          </p>
        </>
      )}
    </>
  );
}

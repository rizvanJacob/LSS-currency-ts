import { useState, useEffect, useContext } from "react";
import ApprovedUsersList from "./ApprovedUsersList";
import getRequest from "../../../utilities/getRequest";
import { User } from "../../../@types/user";
import UnapprovedUsersList from "./UnapprovedUsersList";
import ProgressBar from "../../../components/ProgressBar";
import { CurrentUser } from "../../../@types/currentUser";
import { TitleContext } from "../../../App";

export default function AllUsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
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
      <ApprovedUsersList
        users={approvedUsers as User[]}
        setUsers={setUsers as React.Dispatch<React.SetStateAction<User[]>>}
      />
    </>
  ) : (
    <ProgressBar />
  );
}

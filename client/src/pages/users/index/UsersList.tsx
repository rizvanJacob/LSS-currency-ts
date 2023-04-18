import { useState, useEffect } from "react";
import axios from "axios";
import EditUserButton from "../edit/EditUserButton";
import DeleteUserButton from "../delete/DeleteUserButton";
import { UserProps } from "../../../@types/UserProps";

export type UsersListProps = {
  users: UserProps[];
  setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
};

export default function UsersList({
  users,
  setUsers,
}: UsersListProps): JSX.Element {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Account Type</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserProps) => {
            return (
              <tr key={user.openId}>
                <td>{user.openId}</td>
                <td>{user.displayName}</td>
                <td>{user.accountType}</td>
                <EditUserButton user={user} />
                <DeleteUserButton setUsers={setUsers} user={user} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

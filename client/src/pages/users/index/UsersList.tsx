import { useState, useEffect } from "react";
import axios from "axios";
import EditUserButton from "../edit/EditUserButton";
import DeleteUserButton from "../delete/DeleteUserButton";
import { User } from "../../../@types/user";

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
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
          {users.map((user: User) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
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

import { useState, useEffect } from "react";
import axios from "axios";
import EditUserButton from "../edit/EditUserButton";
import DeleteUserButton from "../delete/DeleteUserButton";
import { User } from "../../../@types/user";
import { SimpleLookup } from "../../../@types/lookup";

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  accountTypes: SimpleLookup[];
};

export default function UsersList({
  users,
  setUsers,
  accountTypes,
}: UsersListProps): JSX.Element {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            const accountType = accountTypes.find((type) => type.id === user.accountType);
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.displayName}</td>
                <td>{accountType ? accountType.name : ""}</td>
                <td>{user.approved ? "Approved" : "Not Approved"}</td>
                <td><EditUserButton user={user} /></td>
                <td><DeleteUserButton setUsers={setUsers} user={user} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

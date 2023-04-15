import { useState, useEffect } from 'react';
import axios from 'axios';

type UsersListProps = {
  users: object;
  setUsers: React.Dispatch<React.SetStateAction<object>>;
}
export default function UsersList({ users, setUsers}: UsersListProps): JSX.Element {
    return (
        <h1>Hello</h1>
    )
}
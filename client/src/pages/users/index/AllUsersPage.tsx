import { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserButton from "../edit/EditUserButton";
import UsersList from "./UsersList";
import getRequest from "../../../../utilities/getRequest";

type User = {
    id: number;
    name: string;
    email: string;
}

export default function AllUsersPage(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);

    /* useEffect(() => {
        getRequest(`/api/users`, setUsers);
    }, []) */

    return (
        <>
        <h1> Display all users for Admin to see</h1>
        {users.length > 0 ? (
            <>
            <UsersList users = { users } setUsers = {setUsers as React.Dispatch<React.SetStateAction<object>>} />
            </>
        ) : (
            <>
            <p> No users found <progress /></p>
            <EditUserButton />
            </>
        )}
        
        </>
    )
}
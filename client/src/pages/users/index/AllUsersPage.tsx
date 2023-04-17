import { useState, useEffect } from 'react';
import UsersList from "./UsersList";
import getRequest from "../../../utilities/getRequest";

export type UserProps = {
    id: number;
    accountType: number;
}

export default function AllUsersPage(): JSX.Element {
    const [users, setUsers] = useState<UserProps[]>([]);

    /* useEffect(() => {
        getRequest(`/api/users`, setUsers);
    }, []) */

    return (
        <>
        <h1> Display all users for Admin to see</h1>
        {users.length > 0 ? (
            <>
            <UsersList users = { users as UserProps[] } setUsers = {setUsers as React.Dispatch<React.SetStateAction<UserProps[]>>} />
            </>
        ) : (
            <>
            <p> No users found <progress /></p>
            </>
        )}
        
        </>
    )
}
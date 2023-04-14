import { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserButton from "../edit/EditUserButton";

export default function AllUsersPage(): JSX.Element {
    return (
        <>
        <h1> Display all users for Admin to see</h1>
        <EditUserButton />
        </>
    )
}
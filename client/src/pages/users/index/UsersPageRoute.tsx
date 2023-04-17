import { Route, Routes } from "react-router-dom";
import AllUsersPage from "./AllUsersPage";

export default function UsersPageRoute() {
    return (
        <Routes>
            <Route
                path='/users'
                element = {<AllUsersPage />} 
            />
        </Routes>
    )
}

import { Route, Routes } from "react-router-dom";
import EditUserForm from "../edit/EditUserForm";
import AllUsersPage from "../index/AllUsersPage";

export default function UserRoutes() {
    return (
        <Routes>
            <Route
                path='/users'
                element = {<AllUsersPage />} 
            />
            <Route
                path='/users/:openId/edit'
                element = {<EditUserForm />} 
            />
        </Routes>
    )
}

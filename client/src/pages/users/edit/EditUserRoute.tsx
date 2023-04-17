import { Route, Routes } from "react-router-dom";
import EditUserForm from "./EditUserForm";

export default function EditUserRoute(): JSX.Element {
    return (
        <Routes>
            <Route
                path='/users/:id/edit'
                element = {<EditUserForm />} 
            />
        </Routes>
    )
}

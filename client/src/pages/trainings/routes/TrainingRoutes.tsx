import { Route, Routes } from "react-router-dom";
import AllTrainingsPage from "../index/AllTrainingsPage"
export default function TrainingRoutes() {
    return (
        <Routes>
            <Route
                path='/trainings'
                element = {<AllTrainingsPage />} 
            />
        </Routes>
    )
}

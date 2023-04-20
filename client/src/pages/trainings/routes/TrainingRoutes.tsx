import { Route, Routes } from "react-router-dom";
import AllTrainingsPage from "../index/AllTrainingsPage";
import TrainingPage from "../show/TrainingPage";
import EditTrainingForm from "../edit/EditTrainingForm";
export default function TrainingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllTrainingsPage />} />
      <Route path="/:id" element={<TrainingPage />} />
      <Route path="/:id/edit" element={<EditTrainingForm />} />
    </Routes>
  );
}

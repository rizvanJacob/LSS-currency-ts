import { Route, Routes } from "react-router-dom";
import DashboardPage from "./DashboardPage";


export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}

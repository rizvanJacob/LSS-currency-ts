import { Routes, Route } from "react-router-dom";
import TraineesIndexPage from "./index/TraineesIndexPage";

const TraineesRoutes = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TraineesIndexPage />} />
        <Route path="/:id" />
        <Route path="/new" />
        <Route path="/:id/edit" />
      </Routes>
    </>
  );
};

export default TraineesRoutes;

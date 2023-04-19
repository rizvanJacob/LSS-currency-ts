import { Routes, Route } from "react-router-dom";
import TraineesIndexPage from "./index/TraineesIndexPage";
import ShowTraineePage from "./show/ShowTraineePage";

const TraineesRoutes = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TraineesIndexPage />} />
        <Route path="/:id" element={<ShowTraineePage />} />
        <Route path="/new" />
        <Route path="/:id/edit" />
      </Routes>
    </>
  );
};

export default TraineesRoutes;

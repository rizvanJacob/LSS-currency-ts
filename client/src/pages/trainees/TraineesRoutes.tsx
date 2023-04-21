import { Routes, Route } from "react-router-dom";
import TraineesIndexPage from "./index/TraineesIndexPage";
import ShowTraineePage from "./show/ShowTraineePage";
import EditTraineePage from "./edit/EditTraineePage";
import BookTrainingPage from "./book/BookTrainingPage";

const TraineesRoutes = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TraineesIndexPage />} />
        <Route path="/:id" element={<ShowTraineePage />} />
        <Route path="/new" />
        <Route path="/:id/edit" element={<EditTraineePage />} />
        <Route path="/:id/book/:requirement" element={<BookTrainingPage />} />
      </Routes>
    </>
  );
};

export default TraineesRoutes;

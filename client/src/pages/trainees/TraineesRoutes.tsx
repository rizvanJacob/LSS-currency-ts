import { Routes, Route } from "react-router-dom";
import TraineesIndexPage from "./index/TraineesIndexPage";
import ShowTraineePage from "./show/ShowTraineePage";
import EditTraineePage from "./edit/EditTraineePage";
import BookTrainingPage from "./book/BookTrainingPage";
import { CurrentUser } from "../../@types/currentUser";
import { useContext } from "react";
import { CurrentUserContext } from "../../App";

const INDEX_PAGE_ACCESS = [1, 2, 4];
const TRAINEE_PAGE_ACCESS = [1, 3, 4]
const TraineesRoutes = (): JSX.Element => {
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  return (
    <>
      {currentUser ? (
        <Routes>
          {INDEX_PAGE_ACCESS.includes(Number(currentUser.accountType)) ? (
            <Route path="/" element={<TraineesIndexPage />} />
          ) : null}
          {TRAINEE_PAGE_ACCESS.includes(Number(currentUser.accountType)) ? (
            <>
            <Route path="/:id" element={<ShowTraineePage />} />
            <Route path="/:id/edit" element={<EditTraineePage />} />
            <Route path="/:id/book/:requirement" element={<BookTrainingPage />} />
            </>
          ) : null}
          <Route path="/new" />
        </Routes>
      ) : null}
    </>
  );
};

export default TraineesRoutes;

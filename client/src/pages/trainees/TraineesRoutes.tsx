import { Account } from "../../../../server/src/constants";
import { Routes, Route, useParams } from "react-router-dom";
import TraineesIndexPage from "./index/TraineesIndexPage";
import ShowTraineePage from "./show/ShowTraineePage";
import EditTraineePage from "./edit/EditTraineePage";
import BookTrainingPage from "./book/BookTrainingPage";
import { CurrentUser } from "../../@types/currentUser";
import { useContext } from "react";
import { CurrentUserContext } from "../../App";

export const INDEX_PAGE_ACCESS = [
  Account.Admin,
  Account.TraineeAdmin,
  Account.Trainer,
];
const TRAINEE_ACTIONS_ACCESS = [Account.Admin, Account.Trainer];
const TRAINEE_AMEND_ACCESS = [Account.Admin, Account.TraineeAdmin];
const TraineesRoutes = (): JSX.Element => {
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const params = useParams();
  const id = Number(params["*"]?.replace(/\/.*/, ""));
  
  return (
    <>
      {currentUser ? (
        <Routes>
          {INDEX_PAGE_ACCESS.includes(Number(currentUser.accountType)) ? (
            <Route path="/" element={<TraineesIndexPage />} />
          ) : null}
          {TRAINEE_ACTIONS_ACCESS.includes(Number(currentUser.accountType)) ||
          id === currentUser.trainee?.id ? (
            <>
              <Route path="/:id" element={<ShowTraineePage />} />
              <Route
                path="/:id/book/:requirement"
                element={<BookTrainingPage />}
              />
            </>
          ) : null}
          {TRAINEE_AMEND_ACCESS.includes(Number(currentUser.accountType)) ? (
            <Route path="/:id/edit" element={<EditTraineePage />} />
          ) : null}
          <Route path="/new" />
        </Routes>
      ) : null}
    </>
  );
};

export default TraineesRoutes;

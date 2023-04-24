import { Route, Routes } from "react-router-dom";
import AllTrainingsPage from "../index/AllTrainingsPage";
import TrainingPage from "../show/TrainingPage";
import EditTrainingForm from "../edit/EditTrainingForm";
import CreateTrainingForm from "../create/CreateTrainingForm";
import UnauthorizedPage from "../../auth/UnauthorizedPage";
import { CurrentUser } from "../../../@types/currentUser";
import { useContext } from "react";
import { CurrentUserContext } from "../../../App";

const CHANGE_TRAINING_ACCESS = [4];

export default function TrainingRoutes() {
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  return (
     <>
      {currentUser ? (
        <Routes>
          <Route path="/" element={<AllTrainingsPage />} />
          <Route path="/:id" element={<TrainingPage />} />
          {CHANGE_TRAINING_ACCESS.includes(currentUser.accountType) ? (
            <>
              <Route path="/:id/edit" element={<EditTrainingForm />} />
              <Route path="/new" element={<CreateTrainingForm />} />
            </>
          ) : <Route path="/unauthorized" element={<UnauthorizedPage/>} />
          };
        </Routes>
      ) : <Route path="/unauthorized" element={<UnauthorizedPage/>} />
      }
    </>
    
  );
}

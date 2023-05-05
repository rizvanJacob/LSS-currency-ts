import { Account } from "../../server/src/constants";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./pages/users/routes/UserRoutes";
import AuthRoutes from "./pages/auth/AuthRoutes";
import TrainingRoutes from "./pages/trainings/routes/TrainingRoutes";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { CurrentUser, UserPayload } from "./@types/currentUser";
import Navbar from "./components/Navbar/Navbar";
import TraineesRoutes from "./pages/trainees/TraineesRoutes";
import LogoutCallback from "./components/LogoutCallback";
import HomePageCallback from "./components/HomePageCallback";

const AUTHORISE = true;
const CURRENT_USER = {
  id: 1,
  accountType: Account.Admin,
  authCategory: 1,
};

const TRAINING_ACCOUNT_TYPES = [
  Account.Admin,
  Account.TraineeAdmin,
  Account.Trainer,
];
const TRAINEE_ACCOUNT_TYPES = [
  Account.Admin,
  Account.TraineeAdmin,
  Account.Trainee,
  Account.Trainer,
];
const USER_ACCOUNT_TYPES = [Account.Admin, Account.TraineeAdmin];

export const CurrentUserContext = createContext<CurrentUser | null>(null);
export const TitleContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!AUTHORISE) {
      setCurrentUser(CURRENT_USER);
    }
    try {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt_decode(token) as UserPayload;
      if (dayjs.unix(decoded.exp).isAfter(dayjs())) {
        setCurrentUser(decoded as CurrentUser);
      } else {
        localStorage.clear();
      }
    } catch (error) {}
  }, []);

  return (
    <TitleContext.Provider value={setTitle}>
      <CurrentUserContext.Provider value={currentUser}>
        {currentUser ? (
          <>
            <div className="App h-screen flex flex-col">
              <Navbar
                accountType={currentUser.accountType}
                traineeId={currentUser.trainee?.id}
                title={title}
              />
              <div className="flex-1 overflow-auto w-screen max-w-3xl flex flex-col items-stretch self-center p-2 space-y-2 justify-start">
                <Routes>
                  {USER_ACCOUNT_TYPES.includes(
                    Number(currentUser.accountType)
                  ) ? (
                    <Route path="/users/*" element={<UserRoutes />} />
                  ) : null}
                  {TRAINEE_ACCOUNT_TYPES.includes(
                    Number(currentUser.accountType)
                  ) ? (
                    <Route path="/trainees/*" element={<TraineesRoutes />} />
                  ) : null}
                  {TRAINING_ACCOUNT_TYPES.includes(
                    Number(currentUser.accountType)
                  ) ? (
                    <Route path="/trainings/*" element={<TrainingRoutes />} />
                  ) : null}
                  <Route path="/logout" element={<LogoutCallback />} />
                  <Route
                    path="/"
                    element={
                      <HomePageCallback
                        accountType={currentUser.accountType}
                        traineeId={currentUser.trainee?.id}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <AuthRoutes setCurrentUser={setCurrentUser} />
        )}
      </CurrentUserContext.Provider>
    </TitleContext.Provider>
  );
}
export default App;

import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UserRoutes from "./pages/users/routes/UserRoutes";
import AuthRoutes from "./pages/auth/AuthRoutes";
import TrainingRoutes from "./pages/trainings/routes/TrainingRoutes";
import jwt_decode from "jwt-decode";
import * as dayjs from "dayjs";
import { CurrentUser, UserPayload } from "./@types/currentUser";
import TempNav from "./components/TempNav";
import TraineesRoutes from "./pages/trainees/TraineesRoutes";

const AUTHORISE = true;
const CURRENT_USER = {
  id: 1,
  accountType: 1,
  authCategory: 1,
};

const TRAINING_ACCOUNT_TYPES = [1, 2, 4];
const TRAINEE_ACCOUNT_TYPES = [1, 2, 3, 4];
const USER_ACCOUNT_TYPES = [1];

export const CurrentUserContext = createContext<CurrentUser | null>(null);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

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
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser ? (
        <>
          <div className="App">
            <h1>A React App made with Vite</h1>
            <TempNav />
          </div>
          <Routes>
            {
              (TRAINEE_ACCOUNT_TYPES.includes(Number(currentUser.accountType))) ? (
                <Route path="/trainees/*" element={<TraineesRoutes />} />
              ) : null
            };
            {
              (USER_ACCOUNT_TYPES.includes(Number(currentUser.accountType))) ? (
                <Route path="/users/*" element={<UserRoutes />} />
              ) : null
            }
            {
              (TRAINING_ACCOUNT_TYPES.includes(Number(currentUser.accountType))) ? (
                <Route path="/trainings/*" element={<TrainingRoutes />} />
              ) : null
            }
          </Routes>
        </>
      ) : (
        <AuthRoutes setCurrentUser={setCurrentUser} />
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;

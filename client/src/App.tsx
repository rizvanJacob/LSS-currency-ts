import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UserRoutes from "./pages/users/routes/UserRoutes";
import AuthRoutes from "./pages/auth/AuthRoutes";
import TrainingRoutes from "./pages/trainings/routes/TrainingRoutes";
import jwt_decode from "jwt-decode";
import * as dayjs from "dayjs";
import { CurrentUser, UserPayload } from "./@types/currentUser";
import TempNav from "./components/TempNav";
import TraineesRoutes from "./pages/trainees/TraineesRoutes";

const AUTHORISE = false;
const CURRENT_USER = {
  accountId: 1,
  accountType: 1,
  category: 1,
};

const CurrentUserContext = createContext<CurrentUser | null>(null);

function App() {
  const currentUserContextValue = useContext(CurrentUserContext);
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
            <Route path="/trainees/*" element={<TraineesRoutes />} />
            <Route path="/users/*" element={<UserRoutes />} />
            <Route path="/trainings/*" element={<TrainingRoutes />} />
          </Routes>
        </>
      ) : (
        <AuthRoutes setCurrentUser={setCurrentUser} />
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;

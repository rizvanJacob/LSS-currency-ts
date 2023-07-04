import { Account } from "../../server/src/constants";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserRoutes from "./pages/users/routes/UserRoutes";
import AuthRoutes from "./pages/auth/AuthRoutes";
import DashboardRoutes from "./pages/dashboard/DashboardRoutes";
import TrainingRoutes from "./pages/trainings/routes/TrainingRoutes";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { CurrentUser, UserPayload } from "./@types/currentUser";
import TraineesRoutes from "./pages/trainees/TraineesRoutes";
import LogoutCallback from "./components/LogoutCallback";
import HomePageCallback from "./components/HomePageCallback";
import VARoutes from "./pages/VA/VARoutes";
import Navbar2 from "./components/Navbar/Navbar";
import NavDrawer from "./components/Navbar/components/NavDrawer";
import { createLogoutTimer } from "./utilities/accountUtils";
import React from "react";

export const UPDATED = "23 Jun 1515H";

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

//#Alvin
interface UserFilters {
  [key: string]: string;
}

interface TraineeFilters {
  [key: string]: string;
}

interface TrainingFilters {
  [key: string]: string;
}

interface FilterContextProps<T> {
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
}

//#Alvin:
export const UsersFilterContext =
  createContext<FilterContextProps<UserFilters> | null>(null);
export const TraineesFilterContext =
  createContext<FilterContextProps<TraineeFilters> | null>(null);
export const TrainingsFilterContext =
  createContext<FilterContextProps<TrainingFilters> | null>(null);

export const CurrentUserContext = createContext<CurrentUser | null>(null);
export const TitleContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

/*#Nimalan
interface Filters {
  [key: string]: string;
}

interface FilterContextProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const FilterContext = createContext<FilterContextProps | null>(null); */

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [title, setTitle] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  //#Alvin:
  const [userFilters, setUserFilters] = useState<UserFilters>({});
  const [traineeFilters, setTraineeFilters] = useState<TraineeFilters>({});
  const [trainingFilters, setTrainingFilters] = useState<TrainingFilters>({});

  /*#Nimalan const [filters, setFilters] = useState<Filters>({}); */

  //const navigate = useNavigate();

  //I would park this function elsewhere, perhaps in a "userUtils" file within the utilities folder
  // const handleIdleTimeout = () => {
  //   setCurrentUser(null);
  //   localStorage.clear();

  //   //instead of using window.location.href,
  //   //you should use a react hook to navigate around the app.
  //   //Can you think of the downsides of using this line below?
  //   alert("Session has expired");
  //   window.location.href = "http://localhost:5173"; // Redirect to "localhost:5173" when user is inactive for ten seconds
  // };

  useEffect(() => {
    let clearLogoutTimer: any = null;
    if (!AUTHORISE) {
      setCurrentUser(CURRENT_USER);
    }
    try {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt_decode(token) as UserPayload;
      if (dayjs.unix(decoded.exp).isAfter(dayjs())) {
        setCurrentUser(decoded as CurrentUser);
        clearLogoutTimer = createLogoutTimer(decoded.exp, setCurrentUser);
      } else {
        localStorage.clear();
      }
    } catch (error) {}

    return () => {
      console.log("cleaning up app");
      clearLogoutTimer();
    };
  }, []);

  console.log("traineeId", currentUser?.trainee?.id);

  return (
    <TitleContext.Provider value={setTitle}>
      <CurrentUserContext.Provider value={currentUser}>
        <UsersFilterContext.Provider
          value={{ filters: userFilters, setFilters: setUserFilters }}
        >
          <TraineesFilterContext.Provider
            value={{ filters: traineeFilters, setFilters: setTraineeFilters }}
          >
            <TrainingsFilterContext.Provider
              value={{
                filters: trainingFilters,
                setFilters: setTrainingFilters,
              }}
            >
              {currentUser ? (
                <div className="drawer">
                  <input
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={drawerOpen}
                    readOnly={true}
                  />
                  <div className="drawer-content flex flex-col h-screen">
                    <Navbar2
                      accountType={currentUser.accountType}
                      traineeId={currentUser.trainee?.id}
                      title={title}
                      openDrawer={() => setDrawerOpen(true)}
                    />
                    <div className="max-w-screen-md pb-24 sm:pb-6 w-full mx-auto my-auto flex-1 overflow-y-auto scrollbar-hide px-2 pt-2">
                      <Routes>
                        {USER_ACCOUNT_TYPES.includes(
                          Number(currentUser.accountType)
                        ) ? (
                          <>
                            <Route path="/users/*" element={<UserRoutes />} />
                            <Route
                              path="/dashboard/*"
                              element={<DashboardRoutes />}
                            />
                          </>
                        ) : null}
                        {TRAINEE_ACCOUNT_TYPES.includes(
                          Number(currentUser.accountType)
                        ) ? (
                          <>
                            <Route
                              path="/trainees/*"
                              element={<TraineesRoutes />}
                            />
                            <Route
                              path="/trainings/*"
                              element={<TrainingRoutes />}
                            />
                          </>
                        ) : null}
                        {TRAINING_ACCOUNT_TYPES.includes(
                          Number(currentUser.accountType)
                        ) ? (
                          <Route
                            path="/trainings/*"
                            element={<TrainingRoutes />}
                          />
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
                  <NavDrawer
                    accountType={currentUser.accountType}
                    traineeId={currentUser.trainee?.id}
                    closeDrawer={() => setDrawerOpen(false)}
                  />
                </div>
              ) : (
                <>
                  <AuthRoutes setCurrentUser={setCurrentUser} />
                  <VARoutes />
                </>
              )}
            </TrainingsFilterContext.Provider>
          </TraineesFilterContext.Provider>
        </UsersFilterContext.Provider>
      </CurrentUserContext.Provider>
    </TitleContext.Provider>
  );
}

export default App;

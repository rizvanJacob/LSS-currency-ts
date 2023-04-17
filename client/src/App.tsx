import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";
import AllUsersPage from "./pages/users/index/AllUsersPage";
import EditUserForm from "./pages/users/edit/EditUserForm";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";

import { CurrentUser } from "./@types/@types.currentUser";

const CurrentUserContext = createContext<CurrentUser | null>(null);
const PageContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [page, setPage] = useState(null);

  const [routeConfig, setRouteConfig] = useState<
    { path: string; element: JSX.Element }[]
  >([]);

  useEffect(() => {
    setRouteConfig([
      {
        path: "/users",
        element: <AllUsersPage />,
      },
      {
        path: "/users/:id/edit",
        element: <EditUserForm />,
      },
    ]);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser ? (
        <PageContext.Provider value={page}>
          <Routes>
            {routeConfig.map((route, index) => {
              return (
                <Route
                  key={`Route_${index}`}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Routes>
        </PageContext.Provider>
      ) : (
        <Home setCurrentUser={setCurrentUser} />
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;

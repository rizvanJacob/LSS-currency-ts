import "./App.css";
import { useState, useEffect } from 'react';
import AllUsersPage from "./pages/users/index/AllUsersPage";
import EditUserForm from "./pages/users/edit/EditUserForm"
import { Route, Routes } from "react-router-dom";
function App() {
  const [routeConfig, setRouteConfig] = useState<{path: string, element: JSX.Element}[]>([]);

  useEffect(() => {
    setRouteConfig([
      {
        path: "/users",
        element: <AllUsersPage />
      },
      {
        path: "/users/:id/edit",
        element: <EditUserForm />
      },
    ])
  }, [])

  return (
    <>
    <div className="App">
      <h1>A React App made with Vite</h1>
    </div>
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
    </>
  );
}
export default App;

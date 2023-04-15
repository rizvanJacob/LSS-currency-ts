import "./App.css";
import axios from "axios";
import { useState, useEffect } from 'react';
import AllUsersPage from "./pages/users/index/AllUsersPage";
import EditUserForm from "./pages/users/edit/EditUserForm"
import { Route, Routes } from "react-router-dom";
function App() {
  const [data, setData] = useState<any>();
  const [routeConfig, setRouteConfig] = useState<{path: string, element: JSX.Element}[]>([]);
  const urlWithProxy = "/api";

  useEffect(() => {
    setRouteConfig([
      {
        path: "/users",
        element: <AllUsersPage />
      },
      {
        path: "/users/123id/edit",
        element: <EditUserForm />
      },
    ])
  }, [])

  function getDataFromServer() {
    axios
      .get(urlWithProxy)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
    <div className="App">
      <button onClick={getDataFromServer}>Access server using proxy</button>
      <p>data : {data}</p>
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

import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";
import EditUserRoute from "./pages/users/edit/EditUserRoute";
import UsersPageRoute from "./pages/users/index/UsersPageRoute";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";

import { CurrentUser } from "./@types/@types.currentUser";

const CurrentUserContext = createContext<CurrentUser | null>(null);
const PageContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [page, setPage] = useState(null);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser ? (
        <PageContext.Provider value={page}>
                <>
                  <div className="App">
                    <h1>A React App made with Vite</h1>
                  </div>
                  <UsersPageRoute />
                  <EditUserRoute />
                </>
        </PageContext.Provider>
      ) : (
        <Home setCurrentUser={setCurrentUser} />
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;

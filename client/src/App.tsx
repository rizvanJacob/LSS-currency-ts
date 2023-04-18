import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";
import UserRoutes from "./pages/users/routes/UserRoutes";
import AuthRoutes from "./pages/auth/AuthRoutes";
import { CurrentUser } from "./@types/@types.currentUser";

const CurrentUserContext = createContext<CurrentUser | null>(null);
const PageContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(
    null
    //   {
    //   accountId: 1,
    //   accountType: "admin",
    //   category: 1,
    // }
  );
  const [page, setPage] = useState(null);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser ? (
        <PageContext.Provider value={page}>
          <>
            <div className="App">
              <h1>A React App made with Vite</h1>
            </div>
            <UserRoutes />
          </>
        </PageContext.Provider>
      ) : (
        <AuthRoutes setCurrentUser={setCurrentUser} />
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;

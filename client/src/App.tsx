import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";
import UserRoutes from "./pages/users/routes/UserRoutes";
import AuthRoutes from "./pages/auth/AuthRoutes";
import jwt_decode from "jwt-decode";
import * as dayjs from "dayjs";
import { CurrentUser, UserPayload } from "./@types/@types.currentUser";

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

  useEffect(() => {
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

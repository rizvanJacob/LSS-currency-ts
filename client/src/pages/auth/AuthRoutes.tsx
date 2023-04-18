import { setCurrentUserProp } from "../../@types/@types.currentUser";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginCallback from "./LoginCallback";

const AuthRoutes = ({ setCurrentUser }: setCurrentUserProp) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/loginCallback"
        element={<LoginCallback setCurrentUser={setCurrentUser} />}
      />
    </Routes>
  );
};

export default AuthRoutes;

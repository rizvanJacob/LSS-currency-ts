import { setCurrentUserProp } from "../../@types/@types.currentUser";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginCallback from "./LoginCallback";
import Decode from "./Decode";

const AuthRoutes = ({ setCurrentUser }: setCurrentUserProp) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/loginCallback"
        element={<LoginCallback setCurrentUser={setCurrentUser} />}
      />
      <Route path="/decode" element={<Decode />} />
    </Routes>
  );
};

export default AuthRoutes;

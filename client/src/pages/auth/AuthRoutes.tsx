import { setCurrentUserProp } from "../../@types/currentUser";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginCallbackPage from "./LoginCallbackPage";
import SignUpPage from "./SignUpPage";
import CheckinCallbackPage from "./Checkin/CheckinCallbackPage";

const AuthRoutes = ({ setCurrentUser }: setCurrentUserProp): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/loginCallback"
        element={<LoginCallbackPage setCurrentUser={setCurrentUser} />}
      />
      <Route path="/checkinCallback" element={<CheckinCallbackPage />} />
      <Route path="/new" element={<SignUpPage />} />
    </Routes>
  );
};

export default AuthRoutes;

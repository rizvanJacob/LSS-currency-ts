import { CurrentUser } from "../@types/currentUser";
import dayjs from "dayjs";

export const createLogoutTimer = (
  expiryUnix: number,
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
) => {
  const timeoutDuration = dayjs.unix(expiryUnix).diff(dayjs());
  console.log("timeout created for ", timeoutDuration / 1000, " seconds");
  const timer = setTimeout(logoutCurrentUser(setCurrentUser), timeoutDuration);

  return () => {
    console.log("clearing timeout");
    clearTimeout(timer);
  };
};

export const logoutCurrentUser =
  (setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>) =>
  () => {
    console.log("session expired");
    window.alert("Session expired. Please log in again.");
    localStorage.clear;
    setCurrentUser(null);
  };

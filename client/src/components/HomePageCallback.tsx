import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

type Prop = {
  accountType: number;
  traineeId?: number | undefined;
};

const HOME_PAGES = ["/", "/users", "/trainees", "/trainees", "/trainings"];

const HomePageCallback = ({ accountType, traineeId }: Prop) => {
  const navigate = useNavigate();
  useEffect(() => {
    let homepath = HOME_PAGES[accountType];
    if (accountType === 3) {
      homepath = `${homepath}/traineeId`;
    }
    console.log("in homepage callback. homepath: ", homepath);
    navigate(homepath, { replace: true });
  }, []);
  return <progress className="progress w-56" />;
};

export default HomePageCallback;

import { useEffect, useRef, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import { useSearchParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../../@types/currentUser";
import CheckinToTraining from "./CheckinToTraining";
import { Training } from "../../../@types/training";

const CheckinCallbackPage = () => {
  const jwtoken = useRef("");
  const user = useRef(0);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;

  useEffect(() => {
    const loginAndGetTrainings = async () => {
      const response = await fetch(
        `/api/login/${code}/?callback=checkinCallback`
      );
      const data = await response.json();
      jwtoken.current = data.token;

      const decodedToken = jwtDecode(data.token) as DecodedToken;
      user.current = decodedToken.id;

      await getRequest(
        `/api/trainings/?checkin=true&user=${user.current}`,
        setTrainings
      );
      setIsLoading(false);
    };
    loginAndGetTrainings();
  }, []);

  return (
    <>
      <h1>Check In</h1>
      <h4>Select a training to check in to:</h4>
      {isLoading ? (
        <progress className="progress w-56" />
      ) : (
        trainings.map((t) => {
          return (
            <CheckinToTraining
              training={t}
              token={jwtoken.current}
              user={user.current}
              setIsLoading={setIsLoading}
              key={t.id}
            />
          );
        })
      )}
    </>
  );
};

export default CheckinCallbackPage;

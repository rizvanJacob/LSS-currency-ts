import { useEffect, useRef, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../../@types/currentUser";
import CheckinToTraining from "./CheckinToTraining";
import { Training } from "../../../@types/training";

const CheckinCallbackPage = () => {
  const jwtoken = useRef("");
  const user = useRef(0);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const code = location.state.code;

  useEffect(() => {
    const loginAndGetTrainings = async () => {
      const response = await fetch(`/api/login/${code}`);
      const data = await response.json();
      jwtoken.current = data.token;

      const decodedToken = jwtDecode(data.token) as DecodedToken;
      user.current = decodedToken.id;
      const trainingsResponse = await fetch(
        `/api/trainings/?checkin=true&user=${user.current}`,
        { headers: { authorization: `bearer ${jwtoken.current}` } }
      );
      const trainingsData = await trainingsResponse.json();
      setTrainings(trainingsData);
      setIsLoading(false);
    };
    loginAndGetTrainings();
  }, []);

  return (
    <div className="card w-96 bg-base-100 shadow-xl bg-info-content">
      <div className="card-body">
        <h1 className="card-title text-3xl text-center font-bold mb-8">Check In</h1>
        <h4 className="text-3xl text-center font-bold mb-8 ">Select a training to check in to:</h4>
        {isLoading ? (
          <progress className="progress w-56" />
        ) : trainings.length ? (
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
        ) : (
          <p>No trainings to check in to</p>
        )}
      </div>
    </div>
  );
};

export default CheckinCallbackPage;

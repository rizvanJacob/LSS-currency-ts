import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../../@types/currentUser";
import CheckinToTraining from "./CheckinToTraining";
import { Training } from "../../../@types/training";

const CheckinCallbackPage = () => {
  const jwtoken = useRef("");
  const user = useRef({
    id: 0,
    accountType: 0,
  });
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
      user.current = decodedToken;
      const trainingsResponse = await fetch(
        `/api/trainings/?checkin=true&user=${user.current.id}`,
        { headers: { authorization: `bearer ${jwtoken.current}` } }
      );
      const trainingsData = await trainingsResponse.json();
      setTrainings(trainingsData);
      setIsLoading(false);
    };
    loginAndGetTrainings();
  }, []);

  return user.current.accountType === 3 ? (
    <div className="card w-96 shadow-xl mx-auto">
      <div className="card-body">
        <h1 className="card-title text-3xl text-center font-bold mb-8">
          Check In
        </h1>
        <h4 className="text-3xl text-center font-bold mb-8 ">
          Select a training to check in to:
        </h4>
        {isLoading ? (
          <progress className="progress w-56" />
        ) : trainings.length ? (
          trainings.map((t) => {
            return (
              <CheckinToTraining
                training={t}
                token={jwtoken.current}
                user={user.current.id}
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
  ) : (
    <div className="alert alert-error shadow-lg">
      <h1 className="text-semibold">You must be a trainee to check in</h1>
      <Link to="/">
        <button className="btn btn-ghost">Back</button>
      </Link>
    </div>
  );
};

export default CheckinCallbackPage;

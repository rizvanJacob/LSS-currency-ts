import { Account } from "../../../../../server/src/constants";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
import getRequest from "../../../utilities/getRequest";
import TraineesTable from "./components/TraineesTable";
import { Trainee } from "../../../@types/trainee";
import { computeOverallStatus } from "../../../utilities/computeCurrencyStatus";
import deleteRequest from "../../../utilities/deleteRequest";

const TraineesIndexPage = (): JSX.Element => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);
  const DEL_TRAINEE_ACCESS = [Account.Admin, Account.TraineeAdmin];
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getRequest("/api/trainees", setTrainees).then(() => {
      setFetchFlag(!fetchFlag);
    });
  }, []);

  useEffect(() => {
    computeOverallStatus(trainees, setTrainees);
  }, [fetchFlag]);

  const deleteTrainee = (id: number) => async () => {
    useEffect(() => {
      if (!DEL_TRAINEE_ACCESS.includes(Number(currentUser?.accountType))) {
        navigate(`/`);
      }
    }, []);
    deleteRequest(`/api/trainees/${id}`, id, setTrainees);
  };

  return (
    <>
      {trainees.length > 0 ? (
        <div className="p-4 space-y-4">
          <h1 className="text-lg text-black font-bold">Trainee Index</h1>
          <TraineesTable trainees={trainees} deleteTrainee={deleteTrainee} />
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-lg font-bold">Fetching Trainees</h1>
          <progress className="progress w-56" />
        </div>
      )}
    </>
  );
};

export default TraineesIndexPage;

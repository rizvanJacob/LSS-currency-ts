import { useEffect, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import TraineesTable from "./components/TraineesTable";
import { Trainee } from "../../../@types/trainee";
import { computeOverallStatus } from "../../../utilities/computeCurrencyStatus";
import deleteRequest from "../../../utilities/deleteRequest";

const TraineesIndexPage = (): JSX.Element => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);

  useEffect(() => {
    getRequest("/api/trainees", setTrainees).then(() => {
      setFetchFlag(!fetchFlag);
    });
  }, []);

  useEffect(() => {
    computeOverallStatus(trainees, setTrainees);
  }, [fetchFlag]);

  const deleteTrainee = (id: number) => async () => {
    deleteRequest(`/api/trainees/${id}`, id, setTrainees);
  };

  return (
    <>
      
      {trainees.length > 0 ? (
        <>
          <h1>Trainees</h1>
          <TraineesTable trainees={trainees} deleteTrainee={deleteTrainee} />
        </>
      ) : (
        <>
          <h1>Fetching Trainees</h1>
          <progress />
        </>
      )}
    </>
  );
};

export default TraineesIndexPage;

import { useEffect, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import TableRow from "./components/TableRow";
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

  const deleteTrainee = (id: number) => {
    deleteRequest(`/api/trainees/${id}`, id, setTrainees);
    console.log("delete")
  };

  return (
    <>
      <h1>Trainees</h1>
      <table>
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Category</th>
            <th>Overall Status</th>
            <th>Account Status</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainees?.map((t) => (
            <TableRow
              trainee={t}
              key={t.id}
              category={t.categories.name}
              overallStatus={t.status || ""}
              deleteTrainee={deleteTrainee}
            />
          ))}
        </tbody>
      </table>
      <p>{JSON.stringify(trainees)}</p>
    </>
  );
};

export default TraineesIndexPage;

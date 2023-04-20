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

  const deleteTrainee = (id: number) => async () => {
    deleteRequest(`/api/trainees/${id}`, id, setTrainees);
    // const response = await fetch(`/api/trainees/${id}`, { method: "DELETE" });
    // const data = await response.json();
    // console.log({ data });
    // const updatedTrainees = trainees.filter((t) => t.id !== id);
    // setTrainees(updatedTrainees);
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

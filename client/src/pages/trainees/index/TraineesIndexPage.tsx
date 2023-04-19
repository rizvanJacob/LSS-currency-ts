import { useEffect, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import TableRow from "./components/TableRow";
import { Trainee } from "../../../@types/trainee";
import { computeOverallStatus } from "../../../utilities/computeCurrencyStatus";

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

  return (
    <>
      <h1>Trainees</h1>
      <table>
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Category</th>
            <th>Overall Status</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainees?.map((t) => (
            <TableRow
              trainee={t}
              key={t.id}
              category={t.categories.name}
              status={t.status || ""}
            />
          ))}
        </tbody>
      </table>
      <p>{JSON.stringify(trainees)}</p>
    </>
  );
};

export default TraineesIndexPage;

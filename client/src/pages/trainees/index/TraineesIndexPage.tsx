import { useEffect, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import { Trainee } from "../../../@types/trainee";
import TableRow from "./components/TableRow";

const TraineesIndexPage = (): JSX.Element => {
  const [trainees, setTrainees] = useState<Trainee[] | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);

  useEffect(() => {
    getRequest("/api/trainees", setTrainees);
    getRequest("/api/lookup/categories", setCategories);
  }, []);

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
              category={categories?.[t.category]}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TraineesIndexPage;

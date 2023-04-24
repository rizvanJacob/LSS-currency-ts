import { useEffect, useState } from "react";
import getRequest from "../../../../utilities/getRequest";
import { Trainee } from "../../../../@types/trainee";
import TraineeListRow from "./TraineeListRow";

const TraineeList = () => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);

  useEffect(() => {
    getRequest(`/api/trainees/?training=9`, setTrainees);
  }, []);

  return (
    <table>
      <thead>
        <th>Trainee</th>
        <th>Category</th>
        <th>Expiry</th>
        <th>Status</th>
      </thead>
      <tbody>
        {trainees.map((t) => {
          return <TraineeListRow trainee={t} key={t.id} />;
        })}
      </tbody>
    </table>
  );
};

export default TraineeList;

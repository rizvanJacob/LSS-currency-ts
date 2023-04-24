import { useEffect, useState } from "react";
import getRequest from "../../../../utilities/getRequest";
import { Trainee } from "../../../../@types/trainee";
import TraineeListRow from "./TraineeListRow";
import { useParams } from "react-router-dom";

const TraineeList = () => {
  const { id: trainingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trainees, setTrainees] = useState<Trainee[]>([]);

  useEffect(() => {
    getRequest(`/api/trainees/?training=${trainingId}`, setTrainees).then(
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  return isLoading ? (
    <progress />
  ) : (
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

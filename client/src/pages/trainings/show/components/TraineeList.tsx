import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getRequest from "../../../../utilities/getRequest";
import TraineeListRow from "./TraineeListRow";
import { Trainee } from "../../../../@types/trainee";

const TraineeList = () => {
  const { id: trainingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [completedTrainees, setCompletedTrainees] = useState<number[]>([]);

  useEffect(() => {
    getRequest(`/api/trainees/?training=${trainingId}`, setTrainees).then(
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const handleCheck = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;

    if (checked) {
      setCompletedTrainees([...completedTrainees, Number(name)]);
    } else {
      setCompletedTrainees(
        completedTrainees.filter((t) => {
          return t !== Number(name);
        })
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit form");
    setIsLoading(true);
    await fetch(`/api/trainings/complete/${trainingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedTrainees),
    });
    await getRequest(`/api/trainees/?training=${trainingId}`, setTrainees);
    setCompletedTrainees([]);
    setIsLoading(false);
  };

  return isLoading ? (
    <progress className="progress w-56"/>
  ) : (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <th>Trainee</th>
          <th>Category</th>
          <th>Expiry</th>
          <th>Status</th>
          <th>Complete</th>
        </thead>
        <tbody>
          {trainees.map((t) => {
            return (
              <TraineeListRow
                trainee={t}
                key={t.id}
                handleChange={handleCheck}
              />
            );
          })}
        </tbody>
      </table>
      <button type="submit">Complete</button>
    </form>
  );
};

export default TraineeList;

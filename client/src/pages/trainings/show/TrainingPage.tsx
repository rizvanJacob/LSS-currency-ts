import { useState, useEffect } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import { useParams, useNavigate } from "react-router-dom";
import TrainingInfo from "./components/TrainingInfo";
import TraineeList from "./components/TraineeList";

export default function TrainingPage(): JSX.Element {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [training, setTraining] = useState<Training>({
    id: 0,
    capacity: 0,
    start: new Date(),
    end: new Date(),
    complete: false,
    requirement: 0,
    requirements: {
      name: "",
    },
    instruction: "",
    trainees: [
      {
        trainees: {
          callsign: "",
          categories: {
            name: "",
          },
          currencies: {
            expiry: new Date(),
          },
        },
      },
    ],
  });

  useEffect(() => {
    getRequest(`/api/trainings/${id}`, setTraining).then(() => {
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <progress />
  ) : (
    <>
      <TrainingInfo
        training={training}
        setTraining={setTraining}
        setTrainings={setTrainings}
      />
      <TraineeList />
    </>
  );
}

import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import { useParams, useNavigate } from "react-router-dom";
import TrainingInfo from "./components/TrainingInfo";
import TraineeList from "./components/TraineeList";
import ProgressBar from "../../../components/ProgressBar";
import { TitleContext } from "../../../App";

export default function TrainingPage(): JSX.Element {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [training, setTraining] = useState<Training>({
    id: 0,
    relatedTraining: 0,
    capacity: 0,
    start: new Date(),
    end: new Date(),
    complete: false,
    requirement: 0,
    requirements: {
      name: "",
    },
    requirementName: "",
    relatedRequirementName: "",
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
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Training");
    getRequest(`/api/trainings/${id}`, setTraining).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (setTitle && training) setTitle(training?.requirements.name);
  }, [training]);

  const setTrainingComplete = () => {
    setTraining({ ...training, complete: true });
  };

  return isLoading ? (
    <ProgressBar />
  ) : (
    <>
      <TrainingInfo
        training={training}
        setTraining={setTraining}
        setTrainings={setTrainings}
      />
      {training.trainees.length ? (
        <TraineeList
          trainingId={training.id}
          trainingComplete={training.complete}
          setTrainingComplete={setTrainingComplete}
          relatedTraining={training.relatedTraining}
          name={training.requirementName}
          relatedName={training.relatedRequirementName}
        />
      ) : (
        <p>No Trainees</p>
      )}
    </>
  );
}

import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training, TrainingFilterOptions } from "../../../@types/training";
import TrainingList from "./components/TrainingList";
import CreateTrainingButton from "../create/CreateTrainingButton";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext, TitleContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";
import TrainingsFilterControls from "./components/TrainingsFilterControls";

export default function AllTrainingsPage(): JSX.Element {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filterOptions, setFilterOptions] = useState<TrainingFilterOptions>({
    requirement: 0,
    showCompleted: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Trainings Index");
    getRequest(`/api/trainings`, setTrainings).then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <ProgressBar />
  ) : (
    <>
      <TrainingsFilterControls
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        trainings={trainings}
      />
      {trainings.length > 0 ? (
        <TrainingList
          trainings={filterTrainings(trainings, filterOptions)}
          setTrainings={setTrainings}
        />
      ) : (
        <p>No trainings to show</p>
      )}
      {(currentUser?.accountType === Account.Trainer ||
        currentUser?.accountType === Account.Admin) && (
          <CreateTrainingButton />
        )}
    </>
  );
}

const filterTrainings = (
  trainings: Training[],
  filterOptions: TrainingFilterOptions
) => {
  return trainings.filter((training) => {
    let completeFilter;
    if (filterOptions.showCompleted) {
      completeFilter = true;
    } else {
      completeFilter = !training.complete;
    }

    let requirementFilter;
    if (filterOptions.requirement) {
      requirementFilter = training.requirement === filterOptions.requirement;
    } else {
      requirementFilter = true;
    }

    return completeFilter && requirementFilter;
  });
};

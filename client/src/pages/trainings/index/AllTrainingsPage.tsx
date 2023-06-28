import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training, TrainingFilterOptions } from "../../../@types/training";
import TrainingList from "./components/TrainingList";
import CreateTrainingButton from "../create/CreateTrainingButton";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext, TitleContext, FilterContext } from "../../../App";
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
  
  const TrainingFilterControls: React.FC = () => {
    const { filters, setFilters } = useContext(FilterContext);
  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    if (setTitle) setTitle("Trainings Index");
    getRequest(`/api/trainings`, setTrainings).then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <ProgressBar />
  ) : (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto scrollbar-hide">
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
      </div>
      {(currentUser?.accountType === Account.Trainer ||
        currentUser?.accountType === Account.Admin) && <CreateTrainingButton />}
    </div>
  );
};

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

// const TrainingsFilterControls = () => {
//   const { setTrainingsFilter } = useContext(TrainingsFilterContext);

//   const handleFilterChange = (event: any) => {
//     const { name, value } = event.target;

//     setTrainingsFilter((prevFilter: any) => ({
//       ...prevFilter,
//       [name]: value,
//     }));
//   };

// };

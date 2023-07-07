import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training, TrainingFilterOptions } from "../../../@types/training";
import TrainingList from "./components/TrainingList";
import CreateTrainingButton from "../create/CreateTrainingButton";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext, TitleContext, MergedFilterContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";
import TrainingsFilterControls from "./components/TrainingsFilterControls";
import CalendarView from "../components/CalendarView"; // updated
import dayjs from "dayjs";  // added

export default function AllTrainingsPage(): JSX.Element {
  const { filterOptions, setFilterOptions } = useContext(MergedFilterContext);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());  // added
  
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  
  useEffect(() => {
    if (setTitle) setTitle("Trainings Index");
    getRequest(`/api/trainings`, setTrainings).then(() => setIsLoading(false));
  }, []);

  const handleFocus = (value: any) => {  // added
    setSelectedDate(value);
  };

  return isLoading ? (
    <ProgressBar />
  ) : (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto scrollbar-hide">
        <TrainingsFilterControls
          trainings={trainings}
        />
        <CalendarView  // added
          trainings={trainings}
          displayDate={selectedDate}
          setDisplayDate={setSelectedDate}
          handleFocus={handleFocus}
          currency="DFS"  // Replace "DFS" with the current selected currency
        />
        {trainings.length > 0 ? (
          <TrainingList
            trainings={filterTrainings(trainings, filterOptions.trainingsFilter)}
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
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
        {/* //RIZ: Set up a new component to toggle between calendar and table view. you'll need a new boolean state for it */}
        {/* if booleanState is true, then display the calendar view, else display the table view */}
        <CalendarView  // added
          //RIZ: instead of trainings you should pass filterTrainings(trainings, filterOptions.trainingsFilter)
          trainings={trainings}
          displayDate={selectedDate}
          setDisplayDate={setSelectedDate}
          handleFocus={handleFocus}
          //RIZ: instead of line 48, you should just pass the correct set of trainings you want to display to the CalendarView component
          currency="DFS"  // Replace "DFS" with the current selected currency
        />
        {/* RIZ: Next, you should have a TrainingList alongside your calendar view. for this List, you pass trainings={trainings.filter(filter all trainings on the selected date + filterOptions.trainingsFilter)} */}
        {/* RIZ: You should also move your calendar view inside this conditional; ie if there are no trainings it will just say no trainings */}
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
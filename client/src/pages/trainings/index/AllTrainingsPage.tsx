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
import CalendarViewControl from "./components/CalendarViewControl";
import TrainingCalendar from "../../../components/Calendar/TrainingCalendar";
import TrainingCard from "../../../components/Calendar/TrainingCard";
import { Value } from "react-calendar/dist/cjs/shared/types";
import dayjs from "dayjs";

export default function AllTrainingsPage(): JSX.Element {
  const { filterOptions } = useContext(FilterContext);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [calendarView, setCalendarView] = useState<boolean>(true);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Trainings Index");
    getRequest(`/api/trainings`, setTrainings).then(() => setIsLoading(false));
  }, []);

  const toggleCalendarView = () => {
    setCalendarView(!calendarView);
  };

  const filteredTrainings = filterTrainings(
    trainings,
    filterOptions.trainingsFilter
  );

  const handleFocus = (value: Value) => {
    const displayTraining = trainings
      .sort((a, b) => {
        return dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1;
      })
      .find((t) => dayjs(t.start).isSame(dayjs(value?.toString()), "date"));

    document.querySelector(`#training${displayTraining?.id}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return isLoading ? (
    <ProgressBar />
  ) : (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto scrollbar-hide">
        <div className="flex flex-row justify-end items-center flex-nowrap">
          <CalendarViewControl
            calendarView={calendarView}
            toggleCalendarView={toggleCalendarView}
          />
          <TrainingsFilterControls trainings={trainings} />
        </div>
        {trainings.length > 0 ? (
          calendarView ? (
            <>
              <TrainingCalendar
                trainings={filteredTrainings}
                displayDate={displayDate}
                setDisplayDate={setDisplayDate}
                handleFocus={handleFocus}
                isForIndex={true}
              />
              {filteredTrainings
                .filter((training) => {
                  return dayjs(training.start).isSame(
                    dayjs(displayDate),
                    "month"
                  );
                })
                .sort((a, b) => {
                  return dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1;
                })
                .map((training) => (
                  <TrainingCard
                    training={training}
                    key={training.id}
                    updateTraining={undefined}
                    isForIndex={true}
                  />
                ))}
            </>
          ) : (
            <TrainingList
              trainings={filteredTrainings}
              setTrainings={setTrainings}
            />
          )
        ) : (
          <p>No trainings to show</p>
        )}
      </div>
      {(currentUser?.accountType === Account.Trainer ||
        currentUser?.accountType === Account.Admin) && <CreateTrainingButton />}
    </div>
  );
}

//utility function to filter trainings
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
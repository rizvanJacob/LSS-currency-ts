import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Training } from "../../@types/training";
import { useState, useEffect } from "react";
import {
  TileDisabledFunc,
  TileClassNameFunc,
  NavigationLabelFunc,
  OnArgs,
  Value,
} from "react-calendar/dist/cjs/shared/types";
import { useSearchParams } from "react-router-dom";

type Prop = {
  trainings: Training[];
  displayDate: Date;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
  handleFocus: (value: Value) => void;
  isForIndex?: boolean;
};

const TrainingCalendar = ({
  trainings,
  displayDate,
  setDisplayDate,
  handleFocus,
  isForIndex = false,
}: Prop) => {
  const [flag, setFlag] = useState(1);
  const datesWithTraining = trainings.map((t) => {
    return dayjs(t.start).toDate();
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const bookedDateString = searchParams.get("selected") as string;
    const bookedDate = dayjs(bookedDateString).toDate();
    if (dayjs(bookedDate).isValid()) setDisplayDate(bookedDate);
  }, []);

  useEffect(() => {
    setFlag(-flag);
  }, [displayDate]);

  const tileDisabled: TileDisabledFunc = ({ date, view }) => {
    if (view === "month") {
      return !datesWithTraining.find((t) => {
        return dayjs(t).isSame(dayjs(date), "day");
      });
    }
    return false;
  };

  const tileClassName: TileClassNameFunc = ({ date, view }) => {
    let className = "";
    if (view === "month") {
      if (
        datesWithTraining.find((t) => {
          return dayjs(t).isSame(dayjs(date), "day");
        })
      ) {
        //tiles with trainings on the date are buttons"
        className = className + " btn btn-tiny";
        const trainingsOnThisDay = trainings.filter((t) =>
          dayjs(t.start).isSame(dayjs(date), "day")
        );
        //tiles are colour coded according to no of vacancies
        const overallVacancies = trainingsOnThisDay.reduce(
          (accumulator, currentTraining) => {
            accumulator += currentTraining.capacity - currentTraining.trainees.length;
            return accumulator;
          },
          0
        );
        if (overallVacancies) className = className + " btn-success";
        else className += " btn-warning";
      }
      //all tiles have min height of 48 px
      className = className + " min-h-[48px]";
    }
    return className;
  };

  const handleActiveStartDateChange = ({ activeStartDate, view }: OnArgs) => {
    if (view === "month" && activeStartDate) {
      setDisplayDate(activeStartDate);
    }
  };

  const getNavigationLabel: NavigationLabelFunc = ({ date }) => {
    const navDisplay = dayjs(date).format("MMM YY");
    return (
      <h4 className="btn btn-sm 2xs:btn-wide btn-secondary ">{navDisplay}</h4>
    );
  };

  return (
    <div className="mx-auto py-5">
      <div className="flex flex-col h-fit items-center">
        <Calendar
          className="flex-1 max-w-sm text-center"
          value={displayDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          onChange={handleFocus}
          minDate={isForIndex ? undefined : dayjs().toDate()}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          prevLabel={
            <div className="btn btn-sm btn-square btn-ghost btn-primary">
              {"<"}
            </div>
          }
          prev2Label={<></>}
          nextLabel={
            <div className="btn btn-sm btn-square btn-ghost btn-primary">
              {">"}
            </div>
          }
          next2Label={<></>}
          navigationLabel={getNavigationLabel}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
};

export default TrainingCalendar;

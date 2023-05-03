import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Training } from "../../../../@types/training";
import { useState, useEffect } from "react";
import {
  TileDisabledFunc,
  TileClassNameFunc,
  NavigationLabelFunc,
} from "react-calendar/dist/cjs/shared/types";
import { useSearchParams } from "react-router-dom";

type Prop = {
  trainings: Training[];
  displayDate: Date;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
};

const TrainingCalendar = ({ trainings, displayDate, setDisplayDate }: Prop) => {
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
            accumulator +=
              currentTraining.capacity - currentTraining.trainees.length;
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

  const onChange = (nextValue: any) => {
    setDisplayDate(nextValue);
  };

  const getNavigationLabel: NavigationLabelFunc = ({ date }) => {
    const navDisplay = dayjs(date).format("MMM YY");
    return <h4 className="btn btn-sm sm:btn-wide btn-ghost">{navDisplay}</h4>;
  };

  return (
    <div className="mx-auto py-5">
      <div className="flex flex-col h-[360px] items-center">
        <Calendar
          className="flex-1 max-w-sm"
          value={displayDate}
          onChange={onChange}
          minDate={dayjs().toDate()}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          prevLabel={
            <div className="ml-16 sm:ml-5 btn btn-sm btn-outline">{"<"}</div>
          }
          prev2Label={<></>}
          nextLabel={<div className="btn btn-sm btn-outline">{">"}</div>}
          next2Label={<></>}
          navigationLabel={getNavigationLabel}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
};

export default TrainingCalendar;

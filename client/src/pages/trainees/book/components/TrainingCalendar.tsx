import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Training } from "../../../../@types/training";
import { useState, useEffect } from "react";
import {
  TileDisabledFunc,
  TileClassNameFunc,
  NavigationLabelArgs,
  NavigationLabelFunc,
} from "react-calendar/dist/cjs/shared/types";

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

  useEffect(() => {
    setFlag(-flag);
    console.log(displayDate);
    console.log(flag);
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
        className = className + " btn btn-tiny";
      }
      className = className + " min-h-[48px]";
    }
    return className;
  };

  const onChange = (nextValue: any) => {
    setDisplayDate(nextValue);
  };

  const getNavigationLabel: NavigationLabelFunc = ({
    date,
    label,
    view,
    locale,
  }) => {
    console.log(date);
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
            <button className="ml-16 sm:ml-5 btn btn-sm btn-outline">
              {"<"}
            </button>
          }
          prev2Label={<></>}
          nextLabel={<button className="btn btn-sm btn-outline">{">"}</button>}
          next2Label={<></>}
          navigationLabel={getNavigationLabel}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
};

export default TrainingCalendar;

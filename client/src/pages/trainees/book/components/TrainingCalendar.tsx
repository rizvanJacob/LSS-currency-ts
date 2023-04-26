import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Training } from "../../../../@types/training";
import {
  TileDisabledFunc,
  TileClassNameFunc,
} from "react-calendar/dist/cjs/shared/types";

type Prop = {
  trainings: Training[];
  displayDate: Date;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
};

const TrainingCalendar = ({ trainings, displayDate, setDisplayDate }: Prop) => {
  const datesWithTraining = trainings.map((t) => {
    return dayjs(t.start).toDate();
  });

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

  return (
    <div className="mx-auto py-5">
      <h3 className="text-center text-md font-semibold">
        {dayjs(displayDate).format("MMM-YY")}
      </h3>
      <div className="flex h-[312px] items-center">
        <button
          className=" font-extrabold text-3xl h-full"
          onClick={() => {
            if (
              dayjs(displayDate)
                .startOf("month")
                .isAfter(dayjs().startOf("month"))
            ) {
              setDisplayDate(
                dayjs(displayDate)
                  .subtract(1, "month")
                  .startOf("month")
                  .toDate()
              );
            }
          }}
        >
          {"<"}
        </button>
        <Calendar
          className="flex-1 max-w-sm"
          value={displayDate}
          onChange={onChange}
          minDate={dayjs().toDate()}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          showNeighboringMonth={false}
          showNavigation={false}
        />
        <button
          className="font-extrabold text-3xl h-full"
          onClick={() => {
            setDisplayDate(
              dayjs(displayDate).add(1, "month").startOf("month").toDate()
            );
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TrainingCalendar;

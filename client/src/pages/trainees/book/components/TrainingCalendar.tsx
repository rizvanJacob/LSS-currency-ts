import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Training } from "../../../../@types/training";
import {
  OnChangeFunc,
  TileDisabledFunc,
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

  const onChange = (nextValue: any) => {
    setDisplayDate(nextValue);
  };

  return (
    <Calendar
      value={displayDate}
      onChange={onChange}
      minDate={dayjs().toDate()}
      tileDisabled={tileDisabled}
    />
  );
};

export default TrainingCalendar;

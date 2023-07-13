import CalendarIcon from "../../../../assets/icons/calendarIcon";
import TableIcon from "../../../../assets/icons/tableIcon";

type Props = {
  calendarView: boolean;
  toggleCalendarView: () => void;
};

const CalendarViewControl = ({ calendarView, toggleCalendarView }: Props) => {
  return (
    <div className="flex-1">
      <div className="max-w-fit">
        <label className="label cursor-pointer">
          <TableIcon className={"fill-none text-primary w-5 h-5"} />
          <input
            className="toggle toggle-primary toggle-xs mx-1"
            type="checkbox"
            checked={calendarView}
            onChange={toggleCalendarView}
          />
          <CalendarIcon className="fill-none text-primary w-5 h-5" />
        </label>
      </div>
    </div>
  );
};

export default CalendarViewControl;

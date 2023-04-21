import { useEffect, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import TrainingCalendar from "./components/TrainingCalendar";
import dayjs from "dayjs";
import { Training } from "../../../@types/training";
import TrainingCard from "./components/TrainingCard";

const BookTrainingPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [displayTrainings, setDisplayTrainings] = useState<Training[]>([]);

  const { id, requirement } = useParams();

  useEffect(() => {
    getRequest(
      `/api/trainings/?trainee=${id}&requirement=${requirement}`,
      setTrainings
    ).then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    const display = trainings.filter((t) =>
      dayjs(t.start).isSame(dayjs(displayDate), "day")
    );
    setDisplayTrainings(display);
  }, [displayDate]);

  return (
    <>
      {loaded ? (
        <>
          <TrainingCalendar
            trainings={trainings}
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
          />
          {displayTrainings.map((t) => {
            return <TrainingCard training={t} />;
          })}
          <p>{JSON.stringify(trainings)}</p>
        </>
      ) : (
        <progress />
      )}
    </>
  );
};

export default BookTrainingPage;

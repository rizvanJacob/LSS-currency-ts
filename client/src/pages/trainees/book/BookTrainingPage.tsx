import { useEffect, useState, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import TrainingCalendar from "./components/TrainingCalendar";
import dayjs from "dayjs";
import { Training } from "../../../@types/training";
import TrainingCard from "./components/TrainingCard";
import ProgressBar from "../../../components/ProgressBar";
import { TitleContext } from "../../../App";

const BookTrainingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [displayTrainings, setDisplayTrainings] = useState<Training[]>([]);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  const { id, requirement } = useParams();

  useEffect(() => {
    if (setTitle) setTitle("Book Training");
    getRequest(
      `/api/trainings/?requirement=${requirement}`,
      setTrainings
    ).then(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const display = trainings.filter((t) =>
      dayjs(t.start).isSame(dayjs(displayDate), "day")
    );
    setDisplayTrainings(display);
    if (setTitle && trainings.length)
      setTitle(`Book ${trainings[0].requirements.name}`);
  }, [displayDate, trainings]);

  const updateTraining = (newTraining: Training) => {
    setTrainings(
      trainings.map((t) => {
        if (t.id === newTraining.id) {
          return newTraining;
        }
        t.trainees = t.trainees.filter((booking) => {
          return (
            booking.trainee === id &&
            (booking.status === 1 || booking.status === 6)
          );
        });
        return t;
      })
    );
  };

  return (
    <>
      {isLoaded ? (
        trainings.length ? (
          <div className="flex flex-col w-screen max-w-md mx-auto p-3">
            <TrainingCalendar
              trainings={trainings}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
            />
            {displayTrainings.map((t) => {
              return (
                <TrainingCard
                  training={t}
                  key={t.id}
                  updateTraining={updateTraining}
                />
              );
            })}
          </div>
        ) : (
          <p className="mx-auto py-5 text-2xl">No trainings available</p>
        )
      ) : (
        <ProgressBar />
      )}
    </>
  );
};

export default BookTrainingPage;

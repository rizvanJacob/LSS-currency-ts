import { useEffect, useState } from "react";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import TrainingCalendar from "./components/TrainingCalendar";
import dayjs from "dayjs";
import { Training } from "../../../@types/training";
import TrainingCard from "./components/TrainingCard";
import ProgressBar from "../../../components/ProgressBar";

const BookTrainingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [displayTrainings, setDisplayTrainings] = useState<Training[]>([]);

  const { id, requirement } = useParams();

  useEffect(() => {
    getRequest(
      `/api/trainings/?trainee=${id}&requirement=${requirement}`,
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
  }, [displayDate, trainings]);

  const updateTraining = (newTraining: Training) => {
    setTrainings(
      trainings.map((t) => {
        if (t.id === newTraining.id) {
          return newTraining;
        }
        return t;
      })
    );
  };

  console.log("trainings");
  console.log(trainings);
  console.log("trainings displayed");
  console.log(displayTrainings);

  return (
    <>
      {isLoaded ? (
        trainings.length ? (
          <div className="flex flex-col w-screen max-w-md mx-auto p-3">
            <h1 className="font-bold text-xl">
              Book {trainings[0].requirements.name}
            </h1>
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

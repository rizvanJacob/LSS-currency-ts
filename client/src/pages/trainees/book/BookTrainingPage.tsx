import { useEffect, useState, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import TrainingCalendar from "./components/TrainingCalendar";
import dayjs from "dayjs";
import { Training } from "../../../@types/training";
import TrainingCard from "./components/TrainingCard";
import ProgressBar from "../../../components/ProgressBar";
import { TitleContext } from "../../../App";
import { Trainee } from "../../../@types/trainee";
import { Value } from "react-calendar/dist/cjs/shared/types";

const BookTrainingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [trainee, setTrainee] = useState<Trainee | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [displayTrainings, setDisplayTrainings] = useState<Training[]>([]);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  const { id, requirement } = useParams();

  useEffect(() => {
    if (setTitle) setTitle("Book Training");
    getRequest(`/api/trainings/?requirement=${requirement}`, setTrainings).then(
      () => {
        getRequest(`/api/trainees/${id}`, setTrainee).then(() => {
          setIsLoaded(true);
        });
      }
    );
  }, []);

  useEffect(() => {
    const display = trainings.filter((t) =>
      dayjs(t.start).isSame(dayjs(displayDate), "month")
    );
    setDisplayTrainings(display);
    if (setTitle && trainings.length && trainings[0].requirements)
      setTitle(`${trainee?.callsign}: Book ${trainings[0].requirements.name}`);
  }, [displayDate, trainings, trainee]);

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

  const handleFocus = (value: Value) => {
    const displayTraining = trainings.find((t) =>
      dayjs(t.start).isSame(dayjs(value?.toString()), "date")
    );

    document.querySelector(`#training${displayTraining?.id}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {isLoaded ? (
        trainings.length ? (
          <div className="flex flex-col mx-auto p-3">
            <TrainingCalendar
              trainings={trainings}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              handleFocus={handleFocus}
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

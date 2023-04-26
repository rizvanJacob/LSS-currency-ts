import { useParams } from "react-router-dom";
import { Training } from "../../../../@types/training";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Trainee } from "../../../../@types/trainee";

type Prop = {
  training: Training;
  updateTraining: any;
};

const TrainingCard = ({ training, updateTraining }: Prop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const { id } = useParams();

  const bookedTrainees = training.trainees.filter((t) => t.status === 1);
  const vacancies = training.capacity - bookedTrainees.length;

  const bookTraining = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/trainees/${id}/book/${training.id}`, {
      method: "PUT",
    });
    const data = await response.json();
    updateTraineesinTraining(data, training, updateTraining);
    setIsLoading(false);
  };

  useEffect(() => {
    const booking = training.trainees.find((t) => {
      return t.trainee === Number(id);
    });
    if (booking) {
      if (booking.status === 1) {
        setButtonText("Unbook");
      } else {
        setButtonText("Leave Waitlist");
      }
    } else {
      if (vacancies) {
        setButtonText("Book");
      } else {
        setButtonText("Join Waitlist");
      }
    }
  }, [training]);

  return (
    <div className="my-2 py-5 px-5 card bg-sky-50 shadow-xl">
      <div className="flex items-center ">
        <div className="flex-1 flex-col">
          <h4 className="card-title">
            {dayjs(training.start).format("DD MMM YY")}
          </h4>
          <p>Start: {dayjs(training.start).format("HH:mm")}</p>
          <p>End: {dayjs(training.end).format("HH:mm")}</p>
          <p>
            Vacancies: {vacancies}/{training.capacity}
          </p>
        </div>
        <button
          className="btn btn-outline min-w-max"
          onClick={bookTraining}
          disabled={isLoading}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TrainingCard;

const updateTraineesinTraining = (
  booking: any,
  training: Training,
  updateTraining: any
) => {
  const isInTraining = training.trainees.find((t) => {
    return t.trainee === booking.trainee;
  });
  console.log("Already in training: ", isInTraining);
  let newTraining = {};

  if (isInTraining) {
    const newTrainees = training.trainees.filter((t) => {
      return t.trainee !== booking.trainee;
    });
    newTraining = { ...training, trainees: newTrainees };
  } else {
    const newTrainees = [
      ...training.trainees,
      {
        id: booking.id || 0,
        trainee: booking.trainee,
        training: booking.training,
        status: booking.status,
      },
    ];
    newTraining = { ...training, trainees: newTrainees };
  }
  return updateTraining(newTraining);
};

import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Training } from "../../@types/training";
import { buildFullUrl } from "../../utilities/stringManipulation";

type Prop = {
  training: Training;
  updateTraining?: ((newTraining: Training) => void);
  isForIndex?: boolean;
  reloadTrainings?: () => void;
};

const TrainingCard = ({
  training,
  // updateTraining,
  isForIndex = false,
  reloadTrainings = () => {},
}: Prop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const { id } = useParams();

  const bookedTrainees = training.trainees.filter((t) => t.status === 1);
  const vacancies = Math.max(0, training.capacity - bookedTrainees.length);

  const bookTraining = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch(
      buildFullUrl(`/api/trainees/${id}/book/${training.id}`),
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // updateTraineesinTraining(data, training, updateTraining);
    reloadTrainings();
    setIsLoading(false);
  };

  useEffect(() => {
    const booking = training.trainees.find((t) => {
      return t.trainee === Number(id);
    });
    console.log("booking");
    console.log(booking);
    if (booking && booking.status !== 4) {
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
    <div
      className="my-2 py-5 px-5 card card-bordered border-primary bg-sky-50 shadow-xl"
      id={`training${training.id}`}
    >
      <div className="flex items-center ">
        <div className="flex-1 flex-col items-start text-left">
          <h4 className="card-title">
            {isForIndex
              ? dayjs(training.start).format("DD MMM YY") +
                ": " +
                training.requirements?.name
              : dayjs(training.start).format("DD MMM YY")}
          </h4>
          <p>Start: {dayjs(training.start).format("HH:mm")}</p>
          <p>End: {dayjs(training.end).format("HH:mm")}</p>
          <p>
            Occupancy: {bookedTrainees.length}/{training.capacity}
          </p>
        </div>
        <div className="btn-group btn-group-vertical sm:btn-group-horizontal">
          {!isForIndex && (
            <button
              className="btn btn-secondary border-primary shadow-md min-w-max capitalize"
              onClick={bookTraining}
              disabled={isLoading}
            >
              {buttonText}
            </button>
          )}
          <Link
            className="btn btn-secondary border-primary shadow-md  min-w-max"
            to={`/trainings/${training.id}`}
          >
            <button>Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;

// const updateTraineesinTraining = (
//   booking: any,
//   training: Training,
//   updateTraining: any
// ) => {
//   const isInTraining = training.trainees.find((t) => {
//     return t.trainee === booking.trainee;
//   });
//   let newTraining = {};

//   if (isInTraining) {
//     const newTrainees = training.trainees.filter((t) => {
//       return t.trainee !== booking.trainee;
//     });
//     newTraining = { ...training, trainees: newTrainees };
//   } else {
//     const newTrainees = [
//       ...training.trainees,
//       {
//         id: booking.id || 0,
//         trainee: booking.trainee,
//         training: booking.training,
//         status: booking.status,
//       },
//     ];
//     newTraining = { ...training, trainees: newTrainees };
//   }
//   return updateTraining(newTraining);
// };

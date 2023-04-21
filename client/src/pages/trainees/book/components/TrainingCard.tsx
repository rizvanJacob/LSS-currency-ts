import { useParams } from "react-router-dom";
import { Training } from "../../../../@types/training";
import dayjs from "dayjs";
type Prop = {
  training: Training;
};

const TrainingCard = ({ training }: Prop) => {
  const { id } = useParams();
  const vacancies = training.capacity - training.trainees.length;

  const bookTraining = async () => {
    const response = await fetch(`/api/trainees/${id}/book/${training.id}`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <h4>Date: {dayjs(training.start).format("DD MMM YY")}</h4>
      <p>Start: {dayjs(training.start).format("HH:mm")}</p>
      <p>End: {dayjs(training.end).format("HH:mm")}</p>
      <p>
        Vacancies: {vacancies}/{training.capacity}
      </p>
      {vacancies > 0 ? (
        <button onClick={bookTraining}>Book</button>
      ) : (
        <button>Join Waitlist</button>
      )}
    </>
  );
};

export default TrainingCard;

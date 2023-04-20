import deleteRequest from "../../../utilities/deleteRequest";
import { Training } from "../../../@types/training";
export default function DeleteTrainingButton({
  setTraining,
  training,
}: {
  setTraining: React.Dispatch<React.SetStateAction<Training>>;
  training: Training;
}): JSX.Element {
  const handleDeleteClick = async (id: number) => {
    try {
      await deleteRequest(`api/training/${id}`, training.id, setTraining);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <button
        onClick={() => handleDeleteClick(training.id)} 
        style={{ backgroundColor: "#E42313" }}
      >
        ❌
      </button>
  );
}

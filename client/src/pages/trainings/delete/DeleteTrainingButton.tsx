import deleteRequest from "../../../utilities/deleteRequest";
import { Training } from "../../../@types/training";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
import { useEffect, useContext } from "react";
export default function DeleteTrainingButton({
  setTraining,
  training,
  setTrainings
}: {
  setTraining: React.Dispatch<React.SetStateAction<Training>>;
  training: Training;
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
}): JSX.Element {
    const currentUser = useContext<CurrentUser | null>(CurrentUserContext)
    const navigate = useNavigate();

    const handleDeleteClick = async (id: number) => {
        if (!currentUser || currentUser.accountType !== 4) {
            navigate('/unauthorized', { replace : true });
        return <></>;
        
    } 
        try {
            await deleteRequest(`/api/trainings/${id}`, training.id, setTrainings);
            navigate("/trainings", { replace: true });
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

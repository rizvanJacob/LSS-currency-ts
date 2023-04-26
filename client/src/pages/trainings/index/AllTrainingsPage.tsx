
import { useState, useEffect, useContext } from 'react';
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import TrainingList from "./TrainingList"
import CreateTrainingForm from "../create/CreateTrainingButton";

export default function AllTrainingsPage(): JSX.Element {
    const [trainings, setTrainings] = useState<Training[]>([]);


    useEffect(() => {
        getRequest(`/api/trainings`, setTrainings);
    }, [])
    
    return (
        <>
            {trainings.length > 0 ? (
            <>
                <h1>Training Index</h1>
                <CreateTrainingForm />
                <TrainingList trainings = { trainings as Training[] } setTrainings = { setTrainings as React.Dispatch<React.SetStateAction<Training[]>>} />
            </>
            ) : (
            <>
                <h1>Fetching Trainings</h1>
                <p><progress /></p>
            </>
            )}
        
        </>
    )
}
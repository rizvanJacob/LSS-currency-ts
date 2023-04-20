import { useState, useEffect } from 'react';
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import TrainingList from "./TrainingList"

export default function AllTrainingsPage(): JSX.Element {
    const [trainings, setTrainings] = useState<Training[]>([]);

    useEffect(() => {
        getRequest(`/api/trainings`, setTrainings);
    }, [])
    
    return (
        <>
        <h1>Available Trainings</h1>
        {trainings.length > 0 ? (
            <>
                <TrainingList trainings = { trainings as Training[] } setTrainings = { setTrainings as React.Dispatch<React.SetStateAction<Training[]>>} />
            </>
        ) : (
            <>
                <p><progress /></p>
            </>
        )}
        
        </>
    )
}
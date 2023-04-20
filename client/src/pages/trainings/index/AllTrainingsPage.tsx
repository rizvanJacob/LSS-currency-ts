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
        <h1> Display all trainings for Admin to see</h1>
        {trainings.length > 0 ? (
            <>
                <TrainingList trainings = { trainings as Training[] } setTrainings = { setTrainings as React.Dispatch<React.SetStateAction<Training[]>>} />
            </>
        ) : (
            <>
                <p> No trainings found <progress /></p>
            </>
        )}
        
        </>
    )
}
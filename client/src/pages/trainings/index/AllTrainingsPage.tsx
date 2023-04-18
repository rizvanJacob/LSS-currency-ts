import { useState, useEffect } from 'react';
import getRequest from "../../../utilities/getRequest";
import { TrainingProps } from "../../../@types/@types.TrainingProps";
import TrainingList from "./TrainingList"

export default function AllTrainingsPage(): JSX.Element {
    const [trainings, setTrainings] = useState<TrainingProps[]>([]);

    useEffect(() => {
        getRequest(`/api/trainings`, setTrainings);
    }, [])
    
    return (
        <>
        <h1> Display all trainings for Admin to see</h1>
        {trainings.length > 0 ? (
            <>
                <TrainingList trainings = { trainings as TrainingProps[] } setTrainings = { setTrainings as React.Dispatch<React.SetStateAction<TrainingProps[]>>} />
            </>
        ) : (
            <>
                <p> No trainings found <progress /></p>
            </>
        )}
        
        </>
    )
}
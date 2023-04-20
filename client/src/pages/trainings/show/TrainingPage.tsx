import { useState, useEffect } from 'react';
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import { useParams, useNavigate } from "react-router-dom";
import TrainingInfo from "./TrainingInfo";
export default function TrainingPage(): JSX.Element {
    const { id } = useParams();
    const [trainings, setTrainings] = useState<Training[]>([])
    const [training, setTraining] = useState<Training>({ 
            id: 0,
            capacity: 0,
            start: new Date(),
            end: new Date(),
            complete: false,
            requirement: 0,
            requirements: {
                name: ''
            },
            trainees: {
                trainees: {
                    callsign: '',
                    categories: {
                        name: '',
                    },
                    currencies: {
                        expiry: new Date()
                    }
                }
            },
            instruction: ""
        });


    useEffect(() => {
        getRequest(`/api/trainings/${id}`, setTraining)
    }, [])

    return (
        <>
            <TrainingInfo training={training} setTraining={setTraining} setTrainings={setTrainings}/>
        </>
    )
}
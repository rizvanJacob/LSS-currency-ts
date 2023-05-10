import { useState, useEffect } from "react";
import { Trainee } from "../../@types/trainee";
import getRequest from "../../utilities/getRequest";
import BarChart from "../../components/Chart/BarChart"

export default function DashboardPage(): JSX.Element {
    const [trainees, setTrainees] = useState<Trainee[]>([]);

    useEffect(() => {
        getRequest(`/api/trainees`, setTrainees);
    }, [])

    console.log(trainees);
    return (
        <>
            <BarChart data = { trainees } />
        </>
    )
}
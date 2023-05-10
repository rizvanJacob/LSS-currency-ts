import { useState, useEffect, useContext  } from "react";
import { Trainee } from "../../@types/trainee";
import getRequest from "../../utilities/getRequest";
import BarChart from "../../components/Chart/BarChart"
import ProgressBar from "../../components/ProgressBar";
import { TitleContext } from "../../App";

export default function DashboardPage(): JSX.Element {
    const [trainees, setTrainees] = useState<Trainee[]>([]);
    const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

    useEffect(() => {
        if (setTitle) setTitle("Data Viz");
        getRequest(`/api/trainees`, setTrainees);
    }, [])

    console.log(trainees);
    return trainees.length ? (
        <>
            <BarChart data = { trainees } />
        </>
    ) : (
        <ProgressBar />
    )
}
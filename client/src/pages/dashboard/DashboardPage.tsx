import { useState, useEffect, useContext  } from "react";
import { Trainee } from "../../@types/trainee";
import { Training } from "../../@types/training";
import getRequest from "../../utilities/getRequest";
import BarChart from "../../components/Chart/BarChart"
import ScatterPlot from "../../components/Chart/ScatterPlot";
import ProgressBar from "../../components/ProgressBar";
import { TitleContext } from "../../App";

export default function DashboardPage(): JSX.Element {
    const [trainees, setTrainees] = useState<Trainee[]>([]);
    const [trainings, setTrainings] = useState<Training[]>([]);
    const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

    useEffect(() => {
        if (setTitle) setTitle("Data Viz");
        getRequest(`/api/trainees`, setTrainees);
        getRequest(`/api/trainings`, setTrainings);
    }, [])

    return  (
        <>
            {trainees.length ? <BarChart data = { trainees } /> : <ProgressBar />}
            {trainings.length ? <ScatterPlot data = { trainings } /> : <ProgressBar />}
        </>
    )
}
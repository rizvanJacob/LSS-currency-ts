import { useState, useEffect, useContext  } from "react";
import { Trainee } from "../../@types/trainee";
import { Training } from "../../@types/training";
import { CurrencyFilter } from "../../@types/analytics";
import getRequest from "../../utilities/getRequest";
import BarChart from "../../components/Chart/BarChart"
import ScatterPlot from "../../components/Chart/ScatterPlot";
import ProgressBar from "../../components/ProgressBar";
import AreaChart from "../../components/Chart/AreaChart";
import BookingCSVButton from "./Components/BookingCSVButton";
import { TitleContext } from "../../App";
import { CategoryToRequirement } from "../../@types/lookup";
import { CurrencyData } from "../../@types/analytics";

export default function DashboardPage(): JSX.Element {
    const [trainees, setTrainees] = useState<Trainee[]>([]);
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [currencyData, setCurrencyData] = useState<CurrencyData>({
        filteredCurrencyMap: {
            "": 0,
        },
        totalExpired: 0
    });
    const [catRequirements, setCatRequirements] = useState<CategoryToRequirement[]>([]);
    const [filterOptions, setFilterOptions] = useState<CurrencyFilter>({
        requirement: 0,
      });

    const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

    useEffect(() => {
        if (setTitle) setTitle("Analytics");
        getRequest(`/api/lookup/categoryToRequirement`, setCatRequirements);
        getRequest(`/api/trainees`, setTrainees);
        getRequest(`/api/trainings`, setTrainings);
    }, []);

    useEffect(() => {
        getRequest(`/api/analytics/requirement/${filterOptions.requirement}`, setCurrencyData);
    }, [filterOptions]);
    return  (
        <div className="flex flex-col">
            <BookingCSVButton/>
            <AreaChart 
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                catRequirements={catRequirements}
                data ={currencyData}
            />
            {trainees.length ? <BarChart 
                data = { trainees } 
            /> : <ProgressBar />}
            {trainings.length ? <ScatterPlot 
                data = { trainings } 
            /> : <ProgressBar />}
        </div>
    )
}
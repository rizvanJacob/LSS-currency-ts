import { useState, useEffect, useContext } from "react";
import { Trainee } from "../../@types/trainee";
import { Training } from "../../@types/training";
import { CurrencyFilter } from "../../@types/analytics";
import getRequest from "../../utilities/getRequest";
import BarChart from "../../components/Chart/BarChart";
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
    totalExpired: 0,
  });
  const [catRequirements, setCatRequirements] = useState<
    CategoryToRequirement[]
  >([]);
  const [filterOptions, setFilterOptions] = useState<CurrencyFilter>({
    requirement: 0,
  });
  const [showItem, setShowItem] = useState<number>(0);

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
    getRequest(
      `/api/analytics/requirement/${filterOptions.requirement}`,
      setCurrencyData
    );
  }, [filterOptions]);
  return (
    <div className="flex flex-col h-full">
      <select
        className="select select-bordered w-full max-w-xs mx-auto mb-2"
        value={showItem}
        onChange={(event) => {
          setShowItem(Number(event.target.value));
        }}
      >
        <option disabled value={0}>
          Select a chart to display
        </option>
        <option value={1}>Expiry Overview by Requirement</option>
        <option value={2}>Trainee Count by Category</option>
        <option value={3}>Trainings Start and End Dates</option>
      </select>
      <div className="flex-1 overflow-auto scrollbar-hide">
        {showItem === 1 && (
          <AreaChart
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            catRequirements={catRequirements}
            data={currencyData}
          />
        )}
        {showItem === 2 && (
          <>
            {trainees.length ? <BarChart data={trainees} /> : <ProgressBar />}
          </>
        )}
        {showItem === 3 && (
          <>
            {trainings.length ? (
              <ScatterPlot data={trainings} />
            ) : (
              <ProgressBar />
            )}
          </>
        )}
      </div>
      <BookingCSVButton />
    </div>
  );
}

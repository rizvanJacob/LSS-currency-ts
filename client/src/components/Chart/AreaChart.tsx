import { Line } from 'react-chartjs-2';
import { CurrencyFilter } from "../../@types/analytics";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, ChartOptions, Filler} from 'chart.js';
import { CategoryToRequirement } from '../../@types/lookup';
import { CurrencyData } from "../../@types/analytics";
import { PointElement, LineElement } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Filler
);

type Prop = {
    filterOptions: CurrencyFilter;
    setFilterOptions: React.Dispatch<React.SetStateAction<CurrencyFilter>>;
    catRequirements: CategoryToRequirement[];
    data: CurrencyData[];
};

const AreaChart = ({ filterOptions, setFilterOptions, catRequirements, data }: Prop) => {
    const uniqueRequirements = [...new Set(catRequirements.map(catRequirement => catRequirement.requirement))];
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilterOptions(prevOptions => ({
          ...prevOptions,
          [name]: Number(value),
        }));
    };

    const datasets = [
        {
            data: Object.values(data),
            fill: true,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ];

    const chartData = {
        labels: Object.keys(data),
        datasets
    };

    const chartOptions: ChartOptions<'line'> = { 
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of Trainees expiring",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Time period (MM-YYYY)"
                },
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
    };
    return (
        <>
            <div className="flex flex-row self-end items-center flex-nowrap">
            <label className="text-xs">Requirements:</label>
                <select
                    className="select select-ghost select-xs w-full max-w-xs flex-auto"
                    value={filterOptions.requirement}
                    onChange={handleChange}
                    name="requirement"
                >
                <option value={0}>Select a requirement</option>
                {uniqueRequirements.map(requirementId => {
                    const catRequirement = catRequirements.find(catReq => catReq.requirement === requirementId);
                    return (
                        <option value={requirementId} key={requirementId}>
                            {catRequirement?.requirements.name}
                        </option>
                    )
                })}
            </select>
            </div>
            <h1>Expiry Overview by Requirement</h1>
            <Line data={chartData} options={chartOptions} />
        </>
      );
};

export default AreaChart;

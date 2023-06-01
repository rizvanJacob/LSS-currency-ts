import { Line } from 'react-chartjs-2';
import { CurrencyFilter } from "../../@types/analytics";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, ChartOptions, Filler, TimeScale } from 'chart.js';
import { CategoryToRequirement } from '../../@types/lookup';
import { CurrencyData } from "../../@types/analytics";
import { PointElement, LineElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import dayjs from "dayjs";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  TimeScale
);

type Prop = {
    filterOptions: CurrencyFilter;
    setFilterOptions: React.Dispatch<React.SetStateAction<CurrencyFilter>>;
    catRequirements: CategoryToRequirement[];
    data: CurrencyData;
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
            data: [data.totalExpired].concat(Object.values(data.filteredCurrencyMap)),
            label: "Currency",
            fill: true,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ];

    const chartData = {
        labels: ["Before today"].concat(Object.keys(data.filteredCurrencyMap)),
        datasets: datasets,
    };
    
    const chartOptions: ChartOptions<'line'> = { 
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of Trainees expiring",
                },
                ticks: {
                    callback: (val) => {
                        if (Number(val) % 1 === 0)
                            return val;
                    },
                },
            },
            x: {
                time: {
                    displayFormats: {
                      quarter: 'MMM YYYY',
                    },
                    tooltipFormat: 'MMM YYYY'
                  },
                title: {
                    display: true,
                    text: "Time period (MMM-YYYY)"
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
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
            <h1 className="text-center">Expiry Overview by Requirement (12 Months Projection)</h1>
            {filterOptions.requirement !== 0 ? (
                <Line data={chartData} options={chartOptions} />
            ) : (
                <h4 className="text-center text-xs underline decoration-solid">Select a requirement in the drop down above to view currency expiry overview for all trainees</h4>
            )}
        </>
      );
};

export default AreaChart;

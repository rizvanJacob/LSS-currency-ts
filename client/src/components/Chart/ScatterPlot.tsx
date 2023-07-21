import { Line } from 'react-chartjs-2';
import { Training } from "../../@types/training";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, ChartOptions, TimeScale } from 'chart.js/auto';
import dayjs from 'dayjs';
import { PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CurrencyFilter } from '../../@types/analytics';
import { Requirement } from '../../@types/lookup';
ChartJS.register(CategoryScale, LinearScale, Tooltip, PointElement, TimeScale);

type Prop = {
  filterOptions: CurrencyFilter;
  setFilterOptions: React.Dispatch<React.SetStateAction<CurrencyFilter>>;
  requirements: Requirement[]
  data: Training[];
};

const LineChart = ({ filterOptions, setFilterOptions, requirements, data }: Prop) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: Number(value),
    }));
  };

  const filteredData = filterOptions.requirement !== 0
  ? data.filter((item) => item.requirement === filterOptions.requirement)
  : data;

  const datasets = filteredData.map(item => {
        const start = dayjs(item.start).toDate();
        const end = dayjs(item.end).toDate();
        const requirement = item.requirements?.name;

        return {
            label: requirement,
            data: [
                { x: start, y: requirement },
                { x: end, y: requirement },
            ],
            borderColor: getRandomColor(),
            borderWidth: 1,
            fill: false,
        }
    })
  const chartData = {
    datasets,
  };

  const chartOptions: ChartOptions<'line'> = {
    scales: {
      y: {
        type: 'category',
        title: {
          display: true,
          text: 'Training',
        },
        labels: filteredData.length > 0
        ? [requirements.find((req) => req.id === filterOptions.requirement)?.name]
        : [],   //To show everything on y label [...new Set(data.map((item) => item.requirements?.name))].sort(),
      },
      
      x: {
        type: 'time',
        time: {
          displayFormats: {
            day: 'dd-MMM-yy',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="flex flex-row self-end items-center flex-nowrap justify-end">
        <label className="text-xs">Requirements:</label>
        <select
            className="select select-ghost select-xs w-full max-w-xs flex-auto"
            value={filterOptions.requirement}
            onChange={handleChange}
            name="requirement"
          >
            <option value={0}>Select a requirement</option>
              {requirements.map((requirement) => (
                <option value={requirement.id} key={requirement.id}>
                  {requirement.name}
                </option>
              ))}
          </select> 
        </div>
        <h1 className="text-center">Training Start/End Date Overview</h1>
        {filterOptions.requirement !== 0 && filteredData.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : filterOptions.requirement !== 0 && filteredData.length === 0 ? (
          <h4 className="text-center text-lg underline decoration-solid">
            No trainings planned for this requirement
          </h4>
        ) : (
          <h4 className="text-center text-xs underline decoration-solid">
            Select a requirement in the drop down above to view all training sessions planned
          </h4>
        )}
    </div>
  );
};

export default LineChart;

function getRandomColor() {
  const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 1 + 1)})`;
  return color;
}
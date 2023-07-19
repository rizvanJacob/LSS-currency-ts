import { Line } from 'react-chartjs-2';
import { Training } from "../../@types/training";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, ChartOptions, TimeScale } from 'chart.js/auto';
import dayjs from 'dayjs';
import { PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CategoryToRequirement } from "../../@types/lookup";
import { CurrencyData, CurrencyFilter } from "../../@types/analytics";

ChartJS.register(CategoryScale, LinearScale, Tooltip, PointElement, TimeScale);

type Prop = {
  filterOptions: CurrencyFilter;
  setFilterOptions: React.Dispatch<React.SetStateAction<CurrencyFilter>>;
  catRequirements: CategoryToRequirement[];
  data: Training[];
};


const LineChart = ({   
  filterOptions,
  setFilterOptions,
  catRequirements,
  data, 
}: Prop) => {
    // const datasets = data.map(item => {
    //     const start = dayjs(item.start).toDate();
    //     const end = dayjs(item.end).toDate();
    //     const requirement = item.requirements.name;
    //     return {
    //         label: requirement,
    //         data: [
    //             { x: start, y: requirement },
    //             { x: end, y: requirement },
    //         ],
    //         borderColor: getRandomColor(),
    //         borderWidth: 1,
    //         fill: false,
    //     }
    // })
    const datasets = catRequirements.filter((catRequirement) =>
    filterOptions.requirement === 0? true: catRequirement.requirement === filterOptions.requirement
    ).map((catRequirement) => {
    const requirementName = catRequirement.requirements.name;
    const filteredData = data.filter((item) => item.requirements.name === requirementName
    );
    return {
      label: requirementName,
      data: filteredData.map((item) => ({
        x: dayjs(item.start).toDate(),
        y: requirementName,
      })),
      borderColor: getRandomColor(),
      borderWidth: 1,
      fill: false,
    };
  });

    const uniqueRequirements = [
      ...new Set(
        catRequirements.map((catRequirement) => catRequirement.requirement)
      ),
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        [name]: Number(value),
      }));
    };
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
        labels: [...new Set(data.map((item) => item.requirements.name))],
        //labels: item.requirements.name,
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
          {uniqueRequirements.map((requirementId) => {
            const catRequirement = catRequirements.find(
              (catReq) => catReq.requirement === requirementId
            );
            return (
              <option value={requirementId} key={requirementId}>
                {catRequirement?.requirements.name}
              </option>
            );
          })}
        </select>
      </div>
      <h1>Training Start/End Date Overview</h1>
      {/* <Line data={chartData} options={chartOptions}/> */}
      {filterOptions.requirement !== 0 ? (
        <Line data={chartData} options={chartOptions} />
              // <LineChart
              // filterOptions={filterOptions}
              // setFilterOptions={setFilterOptions}
              // catRequirements={catRequirements}
              // data={data.filter(item => {
              //   const catRequirement = catRequirements.find(
              //     (catReq) => catReq.requirement
              //   );
              //   return catRequirement?.requirements.name === item.requirements.name;
              // })}
            // />
      ) : (
        <h4 className="text-center text-xs underline decoration-solid">
          Select a training in the drop down above to view the start and end dates
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

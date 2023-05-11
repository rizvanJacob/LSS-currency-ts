import { Line } from 'react-chartjs-2';
import { Training } from "../../@types/training";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, ChartOptions, TimeScale } from 'chart.js/auto';
import dayjs from 'dayjs';
import { PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, Tooltip, PointElement, TimeScale);

type Prop = {
  data: Training[];
};

const LineChart = ({ data }: Prop) => {
    const trainingStart = data.map(item=>dayjs(item.start).toDate());

    const datasets = data.map(item => {
        const start = dayjs(item.start).toDate();
        const end = dayjs(item.end).toDate();
        const requirement = item.requirements.name;

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
    console.log(datasets);
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
      <h1>Training Start/End Date Overview</h1>
      <Line data={chartData} options={chartOptions}/>
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

import { Bar } from 'react-chartjs-2';
import { Trainee } from "../../@types/trainee";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, ChartOptions, ChartType } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

type Prop = {
  data: Trainee[];
};

const BarChart = ({ data }: Prop) => {
  const categories = [...new Set(data.map(item => item.categories.name))];

  const numTrainees = categories.map(category => {
    return data.filter(item => item.categories.name === category).length;
  });

  const getColor = () => {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 1 + 1)})`;
    return color;
  };

  const datasets = [
    {
      data: numTrainees,
      backgroundColor: categories.map(() => getColor()),
      borderWidth: 1,
    }
  ];

  const chartData = {
    labels: categories,
    datasets,
  };

  const chartOptions: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Trainees',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Category',
        },
        type: 'category', 
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
        <h1>Trainee Representation in Categories</h1>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;

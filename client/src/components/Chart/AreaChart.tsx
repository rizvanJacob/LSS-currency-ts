import { Line } from 'react-chartjs-2';
import { Trainee } from "../../@types/trainee";
import { CurrencyFilter } from "../../@types/analytics";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, ChartOptions, ChartType } from 'chart.js';
import { CategoryToRequirement } from '../../@types/lookup';
import { CurrencyData } from "../../@types/analytics";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

type Prop = {
    filterOptions: CurrencyFilter;
    setFilterOptions: React.Dispatch<React.SetStateAction<CurrencyFilter>>;
    catRequirements: CategoryToRequirement[];
    data: CurrencyData[];
};



const AreaChart = ({ filterOptions, setFilterOptions, catRequirements, data }: Prop) => {
    const uniqueCategories = [...new Set(catRequirements.map(catRequirement => catRequirement.category))];
    const uniqueRequirements = [...new Set(catRequirements.map(catRequirement => catRequirement.requirement))];
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilterOptions(prevOptions => ({
          ...prevOptions,
          [name]: Number(value),
        }));
    };

    console.log(data);
    return (
        <div className="flex flex-row self-end items-center flex-nowrap">
            <label className="text-xs">Categories:</label>
            <select
                className="select select-ghost select-xs w-full max-w-xs flex-auto"
                value={filterOptions.category}
                onChange={handleChange}
                name="category"
            >
            <option value={0}>Show all</option>
            {uniqueCategories.map(categoryId => {
                const catRequirement = catRequirements.find(catReq => catReq.category === Number(categoryId));
                return (
                    <option value={categoryId} key={categoryId}>
                    {catRequirement?.categories.name}
                    </option>
                )
            })}
          </select>

          <label className="text-xs">Requirements:</label>
            <select
                className="select select-ghost select-xs w-full max-w-xs flex-auto"
                value={filterOptions.requirement}
                onChange={handleChange}
                name="requirement"
            >
            <option value={0}>Show all</option>
            {uniqueRequirements.map(requirementId => {
                const catRequirement = catRequirements.find(catReq => catReq.requirement === requirementId);
                return (
                    !filterOptions.category ? (
                    <option value={requirementId} key={requirementId}>
                        {catRequirement?.requirements.name}
                    </option>
                    ) : (
                        catRequirement?.category === filterOptions.category && (
                            <option value={requirementId} key={requirementId}>
                                {catRequirement?.requirements.name}
                            </option>
                        )
                    )
                )
            })}
          </select>
        </div>
      );
};

export default AreaChart;

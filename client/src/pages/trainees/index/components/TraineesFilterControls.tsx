import React, { useContext } from "react";
import { Trainee } from "../../../../@types/trainee";
import { FilterContext } from "../../../../App";

type Props = {
  trainees: Trainee[];
};

const TraineesFilterControls = ({ trainees }: Props) => {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((filterOptions) => ({
      ...filterOptions,
      traineesFilter: {
        ...filterOptions.traineesFilter,
        category: Number(event.target.value),
      },
    }));
  };

  const categories = trainees.reduce(
    (acc: { id: number; name: string }[], trainee: Trainee) => {
      if (!acc.find((category) => category.id === trainee.category)) {
        const category = {
          id: trainee.category,
          name: trainee.categories.name,
        };
        acc.push(category);
      }
      return acc;
    },
    []
  );
  categories.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-row justify-end items-center">
      <select
        onChange={handleChange}
        value={filterOptions.traineesFilter.category}
        className="select select-ghost select-xs w-full max-w-xs self-end"
      >
        <option value={0}>Show all categories</option>
        {categories.map((category: { id: number; name: string }) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TraineesFilterControls;

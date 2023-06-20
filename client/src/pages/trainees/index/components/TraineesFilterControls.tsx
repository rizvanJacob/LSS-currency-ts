import React from "react";
import { Trainee, TraineeFilterOptions } from "../../../../@types/trainee";

type Props = {
  filterOptions: TraineeFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<TraineeFilterOptions>>;
  trainees: Trainee[];
};

const TraineesFilterControls = ({
  filterOptions,
  setFilterOptions,
  trainees,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions({ category: Number(event.target.value) });
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

  return (
    <div className="flex flex-row justify-end items-center">
      <select
        onChange={handleChange}
        value={filterOptions.category}
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

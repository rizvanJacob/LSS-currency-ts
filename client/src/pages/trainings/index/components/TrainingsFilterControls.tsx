import { useContext } from "react";
import { Training, TrainingFilterOptions } from "../../../../@types/training";
import { FilterContext } from "../../../../App";

type Props = {
  trainings: Training[];
};

const TrainingsFilterControls = ({ trainings }: Props) => {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const requirements = trainings.reduce(
    (acc: { id: number; name: string }[], training) => {
      if (!acc.find((requirement) => requirement.id === training.requirement)) {
        const requirement = {
          id: training.requirement,
          name: training?.requirements?.name || "",
        };
        acc.push(requirement);
      }
      return acc;
    },
    []
  );
  requirements.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <select
        className="select select-ghost select-xs w-full max-w-xs flex-auto"
        value={filterOptions.trainingsFilter.requirement}
        onChange={(event) => {
          setFilterOptions((filterOptions) => ({
            ...filterOptions,
            trainingsFilter: {
              ...filterOptions.trainingsFilter,
              requirement: parseInt(event.target.value),
            },
          }));
        }}
      >
        <option value={0}>Show all</option>
        {requirements.map((requirement) => (
          <option value={requirement.id} key={requirement.id}>
            {requirement.name}
          </option>
        ))}
      </select>
      <label className="cursor-pointer label">
        <span className="label-text text-xs text-left whitespace-nowrap">
          Show Completed
        </span>
        <input
          type="checkbox"
          className="toggle toggle-primary toggle-xs"
          checked={filterOptions.trainingsFilter.showCompleted}
          onChange={(event) => {
            setFilterOptions((filterOptions) => ({
              ...filterOptions,
              trainingsFilter: {
                ...filterOptions.trainingsFilter,
                showCompleted: event.target.checked,
              },
            }));
          }}
        />
      </label>
    </>
  );
};

export default TrainingsFilterControls;

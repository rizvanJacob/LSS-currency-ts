import { Training, TrainingFilterOptions } from "../../../../@types/training";

type Props = {
  filterOptions: TrainingFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<TrainingFilterOptions>>;
  trainings: Training[];
};

const TrainingsFilterControls = ({
  filterOptions,
  setFilterOptions,
  trainings,
}: Props) => {
  return (
    <div className="flex flex-row self-end items-center flex-nowrap">
      <select
        className="select select-ghost select-xs w-full max-w-xs flex-auto"
        value={filterOptions.requirement}
        onChange={(event) => {
          setFilterOptions({
            ...filterOptions,
            requirement: parseInt(event.target.value),
          });
        }}
      >
        <option value={0}>Show all</option>
        {trainings
          .reduce((acc: { id: number; name: string }[], training) => {
            if (
              !acc.find(
                (requirement) => requirement.id === training.requirement
              )
            ) {
              const requirement = {
                id: training.requirement,
                name: training?.requirements?.name || "",
              };
              acc.push(requirement);
            }
            return acc;
          }, [])
          .map((requirement) => (
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
          checked={filterOptions.showCompleted}
          onChange={(event) => {
            setFilterOptions({
              ...filterOptions,
              showCompleted: event.target.checked,
            });
          }}
        />
      </label>
    </div>
  );
};

export default TrainingsFilterControls;

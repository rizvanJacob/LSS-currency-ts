import { useContext } from "react";
import { User } from "../../../../@types/user";
import { FilterContext } from "../../../../App";

type Prop = {
  users: User[];
};

const UsersFilterControls = ({ users }: Prop) => {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);

  const accountTypes = users.reduce(
    (acc: { id: number; name: string }[], user) => {
      if (!acc.find((accUser) => accUser.id === user.accountType)) {
        acc.push({
          id: user.accountType,
          name: user.accountTypes?.name || "",
        });
      }
      return acc;
    },
    []
  );
  accountTypes.sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="flex flex-row items-center justify-end">
      <select
        value={filterOptions.usersFilter.accountType}
        onChange={(e) =>
          setFilterOptions((filterOptions) => ({
            ...filterOptions,
            usersFilter: {
              ...filterOptions.usersFilter,
              accountType: parseInt(e.target.value),
            },
          }))
        }
        className="select select-ghost select-xs w-full max-w-xs self-end"
      >
        <option value={0}>Show all</option>
        {accountTypes.map((accountType) => (
          <option key={accountType.id} value={accountType.id}>
            {accountType.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UsersFilterControls;

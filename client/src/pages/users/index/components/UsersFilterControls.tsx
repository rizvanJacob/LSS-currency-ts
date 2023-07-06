import { useContext } from "react";
import { User, UserFilterOptions } from "../../../../@types/user";
import { MergedFilterContext } from "../../../../App";

type Prop = {
  users: User[];
};

const UsersFilterControls = ({ users }: Prop) => {
  const { filterOptions, setFilterOptions } = useContext(MergedFilterContext);

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
        {users
          .reduce((acc: { id: number; name: string }[], user) => {
            if (!acc.find((accUser) => accUser.id === user.accountType)) {
              acc.push({
                id: user.accountType,
                name: user.accountTypes?.name || "",
              });
            }
            return acc;
          }, [])
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default UsersFilterControls;

import { User, UserFilterOptions } from "../../../../@types/user";

type Prop = {
  filterOptions: UserFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<UserFilterOptions>>;
  users: User[];
};

const UsersFilterControls = ({
  filterOptions,
  setFilterOptions,
  users,
}: Prop) => {
  return (
    <div className="flex flex-row items-center justify-end">
      <select
        value={filterOptions.accountType}
        onChange={(e) =>
          setFilterOptions({
            ...filterOptions,
            accountType: parseInt(e.target.value),
          })
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

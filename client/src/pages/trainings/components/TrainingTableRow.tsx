export default function TrainingTableRow() {
  return (
    <thead className="bg-blue-500 text-black">
      <tr>
        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
          Requirement
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden 2xs:table-cell">
          Occupancy
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Date (St.)
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Time (St.)
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Date (End)
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Time (End)
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Complete
        </th>
        <th className="px-0 py-2 text-center text-xs font-medium uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}

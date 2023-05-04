export default function TrainingTableRow() {
  return (
    <thead className="bg-blue-500 text-black">
      <tr>
        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
          Requirement
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hidden 2xs:table-cell">
          Capacity
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Date
        </th>
        <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Start
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          End
        </th>
        <th className="px-0 py-2 text-center text-xs font-medium uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}

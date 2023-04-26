export default function TrainingTableRow() {
    return (
        <thead className="bg-blue-500 text-black">
            <tr>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Requirement</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Capacity</th>
                <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hidden md:table-cell">Start Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hidden md:table-cell">End Date</th>
                <th className="px-0 py-2 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
    )
}
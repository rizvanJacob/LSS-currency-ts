
export default function UserTableRow() {
    return (
        <thead className="bg-blue-500 text-black">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hidden md:table-cell">Account Type</th>
            <th className="px-0 py-2 text-center text-xs font-medium uppercase tracking-wider" colSpan={2}>Actions</th>
          </tr>
        </thead>
    )
}
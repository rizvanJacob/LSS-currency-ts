
export default function UserTableRow() {
    return (
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Account Type</th>
            <th className="px-0 py-2 text-left text-xs font-medium uppercase tracking-wider" colSpan={2}>Actions</th>
          </tr>
        </thead>
    )
}
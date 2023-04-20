
export default function UserTableRow() {
    return (
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
    )
}

export default function UserTableRow() {
    return (
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Type</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
    )
}
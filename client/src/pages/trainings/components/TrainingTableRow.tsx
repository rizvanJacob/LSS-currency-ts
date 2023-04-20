export default function TrainingTableRow() {
    return (
        <thead>
            <tr>
                <th>ID</th>
                <th>Requirement</th>
                <th>Capacity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th colSpan={2}>Actions</th>
            </tr>
        </thead>
    )
}
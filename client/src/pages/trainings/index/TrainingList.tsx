import { useState, useEffect } from 'react';

import { Training } from "../../../@types/training"

export type TrainingListProps = {
  trainings: Training[];
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
}


export default function TrainingList({ trainings, setTrainings}: TrainingListProps): JSX.Element {
    return (
        <>
            <table>
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
                <tbody>
                    {trainings.map((training: Training) => {
                        const startDate = new Date(training.start).toLocaleString();
                        const endDate = new Date(training.end).toLocaleString();
                        return (
                            <tr key={training.id}>
                                <td>{training.id}</td>
                                <td>{training.requirements.name}</td>
                                <td>{training.capacity}</td>
                                <td>{startDate}</td>
                                <td>{endDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
import { useState, useEffect } from 'react';

import { TrainingProps } from "../../../@types/@types.TrainingProps"

export type TrainingListProps = {
  trainings: TrainingProps[];
  setTrainings: React.Dispatch<React.SetStateAction<TrainingProps[]>>;
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
                    {trainings.map((training: TrainingProps) => {
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
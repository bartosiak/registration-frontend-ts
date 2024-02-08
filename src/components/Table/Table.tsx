import React from 'react';
import "./Table.css";

interface Event {
    name: string;
    _id: number;
    city: {
      key: string;
      value: string;
    },
    event: {
      key: string;
      value: string;
    }
  }

interface TableProps {
    events: Event[];
    deleteEvent: (id: number) => void;
    className?: string;
}

export const Table: React.FC<TableProps> = ({ events, deleteEvent, ...rest }) => {
    return (
        <table {...rest}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Imię i Nazwisko</th>
                    <th>Wydarzenie</th>
                    <th>Miasto</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {events.map((row: Event, index: number) => {
                    return (
                        <tr key={row._id}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td data-eventkey={row.event.key}>{row.event.value}</td>
                            <td data-citykey={row.city.key}>{row.city.value}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        deleteEvent(row._id);
                                    }}
                                    className="delete"
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

import "./Table.css";
import {Event} from "../../App"


interface TableProps {
    events: Event[];
    deleteEvent: (id: number) => void;
    className?: string;
}

export const Table = ({ events, deleteEvent, ...rest }: TableProps): JSX.Element => {
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
                            <td data-eventkey={row.event.key}>{row.event.val}</td>
                            <td data-citykey={row.city.key}>{row.city.val}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        deleteEvent(row._id || 0);
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

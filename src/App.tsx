import axios from "axios";
import { config } from "./config";
import { useEffect, useState } from "react";
import { Form } from "./components/Form/Form";
import { Table } from "./components/Table/Table";

import "./App.css";

export interface KeyValue {
    key: string;
    val: string;
}

export interface Event {
    name: string;
    event: KeyValue;
    city: KeyValue;
    _id?: number;
}


function App(): JSX.Element {
    const [events, setEvents] = useState< Event[]>([]);

    useEffect(() => {
        getEvents();
  
    }, []);

    const getEvents = (): void => {
        axios
            .get<Event[]>(config.api.url + "/events")
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const deleteEvent = (rowId: number): void => {

        if (window.confirm("Usunąć zapis na szkolenie?")) {
            axios
                .delete(config.api.url + "/events/delete/" + rowId)
                .then((res) => {
                    if (res.data.deletedEvent) {
                        getEvents();
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <div className="App">
            <div className="formContainer">
                <Form getEvents={getEvents} />
            </div>
            <div className="tableContainer">
                <Table
                    events={events}
                    deleteEvent={deleteEvent}
                    className="table"
                />
            </div>
        </div>
    );
}

export default App;
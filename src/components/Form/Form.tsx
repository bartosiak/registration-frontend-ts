import axios from "axios";
import { config } from "../../config";
import { useState } from "react";
import { Select } from "../Select/Select";
import "./Form.css";

interface KeyValue {
    key: string;
    val: string;
}

interface Event {
    name: string;
    event: KeyValue;
    city: KeyValue;
}

interface FormProps {
    getEvents: () => void;
  }


export function Form(props: FormProps) {
    const [name, setName] = useState<string>("");
    const [event, setEvent] = useState<KeyValue>({ key: "", val: "" });
    const [city, setCity] = useState<KeyValue>({ key: "", val: "" });
    const [errors, setErrors] = useState<JSX.Element[]>([]);

    const choicesEvents: [string, string][] = [
        ["", "---"],
        ["front-end-react", "Front End - ReactJS"],
        ["back-end-react", "Back End - Node.js"],
        ["full-stack-react", "Full Stack - MERN"],
        ["tester-manual", "Tester manualny"],
    ];

    const choicesCities: [string, string][] = [
        ["", "---"],
        ["online", "Online"],
        ["warsaw", "Warszawa"],
        ["cracow", "Kraków"],
    ];

    const saveEvent = (eventObj: Event) => {
        axios
            .post(config.api.url + "/events/add", eventObj,)
            .then((res) => {
                console.log(res)
                props.getEvents();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const resetForm = () => {
        setName("");
        setEvent({ key: "", val: "" });
        setCity({ key: "", val: "" });
        setErrors([]);
    };

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errorsValidate: string[] = [];

        if (name.trim() === "") {
            errorsValidate.push("Wpisz Imię i Nazwisko");
        }

        if (event.key.trim() === "") {
            errorsValidate.push("Wybierz szkolenie");
        }

        if (city.key.trim() === "") {
            errorsValidate.push("Wybierz Miasto");
        }

        if (errorsValidate.length > 0) {
            setErrors(
                errorsValidate.map((errorTxt, index) => {
                    return <li key={index}>{errorTxt}</li>;
                })
            );

            return false;
        }

        const newEvent = {
            name: name,
            event: event,
            city: city,
        };

        saveEvent(newEvent);
        resetForm();
    };

    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEvent({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText,
        });
    };
    const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCity({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText,
        });
    };

    return (
        <div className="formWrapper">
            <form action="#" onSubmit={validateForm}>
                <div className="wrapper">
                    <label htmlFor="name">Imię i Nazwisko</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="wrapper">
                    <label htmlFor="event">Wydarzenie</label>
                    <Select
                        values={choicesEvents}
                        selectedValue={event.key}
                        onValueChange={handleChangeEvent}
                        id="event"
                    />
                </div>
                <div className="wrapper">
                    <label htmlFor="city">Miasto</label>
                    <Select
                        values={choicesCities}
                        selectedValue={city.key}
                        onValueChange={handleChangeCity}
                        id="city"
                    />
                </div>
                <div className="wrapper">
                    <button type="submit" className="submit">
                        Zapisz na szkolenie
                    </button>
                </div>
            </form>

            <div className="errorsWrapper">
                <ul className="errors">{errors}</ul>
            </div>
        </div>
    );
}
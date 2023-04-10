import { useState } from "react";
import styles from "./Input.module.css";

const Input = (props) => {
    const [state, setState] = useState("");

    const handleChange = (event) => {
        props.setState
            ? (props.hasOwnProperty("state") ? props.setState(event.target.value) : props.setState(!props.checked))
            : setState(event.target.value);
    };

    const getClassName = () => {
        let className = styles.input;

        if (props.invalid) {
            className = [className, styles.inputInvalid].join(" ");
        };
        if (props.className) {
            className = [props.className, className].join(" ");
        };

        return className;
    };


    return (
        <input
            type={props.type ? props.type : "text"}
            id={props.id ? props.id : ""}
            className={getClassName()}
            value={props.state ? props.state : state}
            onChange={handleChange}
            checked={props.checked}
            placeholder={props.placeholder}
        />
    );
};

export default Input;

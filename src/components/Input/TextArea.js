import { useState } from "react";
import styles from "./Input.module.css";

const TextArea = (props) => {
    const [state, setState] = useState("");

    const handleChange = (event) => {
        props.setState
            ? props.setState(event.target.value)
            : setState(event.target.value);
    };

    const getClassName = () => {
        let name = styles.textarea;

        if (props.invalid) {
            name = [name, styles.inputInvalid].join(" ");
        };

        if (props.styles) {
            name = [name, props.styles].join(" ");
        };
        
        return name;
    };

    return (
        <textarea
            id={props.id ? props.id : ""}
            className={getClassName()}
            value={props.state ? props.state : state}
            onChange={handleChange}
        />
    );
};

export default TextArea;

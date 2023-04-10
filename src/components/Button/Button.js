import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            className={
                props.className
                    ? `${props.className} ${styles.primaryButton}`
                    : styles.primaryButton
            }
            onClick={props.onClick}
            
            >
            {props.text ? props.text : "Button"}
        </button>
    );
};

export default Button;
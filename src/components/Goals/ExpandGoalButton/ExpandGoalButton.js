import styles from "./ExpandGoalButton.module.css";

const ExpandGoalButton = (props) => {
    return (
        <button
            type="button"
            className={props.active
                ? [styles.button, styles.active].join(" ")
                : styles.button} />
    );
};

export default ExpandGoalButton;

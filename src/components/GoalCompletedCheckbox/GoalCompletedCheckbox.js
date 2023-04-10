import styles from "./GoalCompletedCheckbox.module.css";

const GoalCompletedCheckbox = ({ id, isCompleted, onClick }) => {
    return (
        <div className={styles.checkboxFrame}>
            <input
                className={styles.checkbox}
                type="checkbox" id={id ? `circle${id}` : "circle"}
                checked={isCompleted || false}
                readOnly />
            <label
                className={[styles.customCheckbox, styles.customCircleCheckbox].join(" ")}
                htmlFor={id ? `circle${id}` : "circle"}
                onClick={onClick} />
        </div>
    );
};

export default GoalCompletedCheckbox;

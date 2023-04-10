import styles from "./GoalImportanceCheckbox.module.css";

const GoalImportanceCheckbox = ({ id, isImportant, onClick }) => {
    return (
        <div className={styles.checkboxFrame}>
            <input
                className={styles.checkbox}
                type="checkbox" id={id ? `star${id}` : "star"}
                checked={isImportant || false}
                readOnly />
            <label
                className={[styles.customCheckbox, styles.customStarCheckbox].join(" ")}
                htmlFor={id ? `star${id}` : "star"}
                onClick={onClick} />
        </div>
    );
};

export default GoalImportanceCheckbox;

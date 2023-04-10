import styles from "./GoalCreationForm.module.css"
import Input from "../../Input/Input"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createGoal } from "../../../app/goalsSlice";
import AddGoalButton from "../AddGoalButton/AddGoalButton";
import ExpandGoalButton from "../ExpandGoalButton/ExpandGoalButton";

const GoalCreationForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetCompletionDate, setTargetCompletionDate] = useState("");
    const [plannedProgress, setPlannedProgress] = useState("");
    const [additionalFieldsToggle, setAdditionalFieldsToggle] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(createGoal({
            title: title,
            description: description,
            targetCompletionDate: targetCompletionDate,
            plannedProgress: plannedProgress,
        }))

        clearForm();
        setAdditionalFieldsToggle(false);
    };

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setTargetCompletionDate("");
        setPlannedProgress("");
    };

    const toggleAdditionalFields = () => {
        setAdditionalFieldsToggle(prev => !prev);
    }

    return (
        <form className={styles.form} onMouseDown={event => event.stopPropagation()} onSubmit={handleSubmit}>
            <div>

                <div className={[styles.frame, "wrapper"].join(" ")}>
                    <Input className={styles.input} type="text" state={title} setState={setTitle} placeholder="Title" />
                </div>

                <div
                    className={additionalFieldsToggle
                        ? [styles.additionalFields, styles.additionalFieldsActive].join(" ")
                        : styles.additionalFields}>

                    <div className={[styles.additionalFieldsFrame, "wrapper"].join(" ")}>
                        <Input
                            className={styles.input}
                            type="text" state={description}
                            setState={setDescription}
                            placeholder="Description" />
                    </div>

                    <div className={[styles.additionalFieldsFrame, "wrapper"].join(" ")}>
                        <Input
                            className={styles.input}
                            type="date"
                            state={targetCompletionDate}
                            setState={setTargetCompletionDate}
                            placeholder="Planned date" />
                    </div>

                    <div className={[styles.additionalFieldsFrame, "wrapper"].join(" ")}>
                        <Input
                            className={styles.input}
                            type="text" state={plannedProgress}
                            setState={setPlannedProgress}
                            placeholder="Progress goal" />
                    </div>

                </div>

                <div className={[styles.formPanel, "wrapper"].join(" ")}>
                    <div className={styles.expandBlock} onClick={toggleAdditionalFields}>
                        <ExpandGoalButton active={additionalFieldsToggle} />
                        <div className={styles.additionalFieldsToggle}>
                            {additionalFieldsToggle ? "Hide additional fields" : "Show additional fields"}
                        </div>
                    </div>
                    <AddGoalButton onClick={handleSubmit} />
                </div>

            </div>

        </form>
    );
};

export default GoalCreationForm;
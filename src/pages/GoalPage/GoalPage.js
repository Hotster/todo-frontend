import styles from "./GoalPage.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalDetails, resetUserState, selectGoalDetails, updateGoalDetails } from "../../app/goalDetailsSlice";
import { useEffect, useState } from "react";
import GoalCompletedCheckbox from "../../components/GoalCompletedCheckbox/GoalCompletedCheckbox";
import GoalImportanceCheckbox from "../../components/GoalImportanceCheckbox/GoalImportanceCheckbox";
import Button from "../../components/Button/Button";

const GoalPage = () => {
    const { id } = useParams();
    const goal = useSelector(selectGoalDetails);

    const dispatch = useDispatch();

    const [goalFields, setGoalFields] = useState({
        title: "",
        isCompleted: false,
        isImportant: false,
        description: "",
        plannedProgress: "",
        currentProgress: "",
        targetCompletionDate: "",
        creationDate: "",
    })

    const handleTitleChange = (event) => {
        setGoalFields(prevState => ({ ...prevState, title: event.target.value }));
        const target = event.target;
        target.style.minHeight = "2.3em";
        target.style.height = "2.3em";
        target.style.height = `${target.scrollHeight}px`;
    }

    const handleDescriptionChange = (event) => {
        setGoalFields(prevState => ({ ...prevState, description: event.target.value }));
        const target = event.target;
        target.style.minHeight = "2.3em";
        target.style.height = "2.3em";
        target.style.height = `${target.scrollHeight}px`;
    }

    const handlePlannedProgressChange = (event) => {
        setGoalFields(prevState => ({ ...prevState, plannedProgress: event.target.value }));
    }

    const handleCurrentProgressChange = (event) => {
        setGoalFields(prevState => ({ ...prevState, currentProgress: event.target.value }));
    }

    const handleTargetCompletionDateChange = (event) => {
        setGoalFields(prevState => ({ ...prevState, targetCompletionDate: event.target.value }));
    }

    const handleStatusCheckboxClick = () => {
        setGoalFields(prevState => ({ ...prevState, isCompleted: !prevState.isCompleted }));
    }

    const handleImportanceCheckboxClick = () => {
        setGoalFields(prevState => ({ ...prevState, isImportant: !prevState.isImportant }));
    }

    const handleSaveChangesClick = () => {
        const data = {
            id: goal.id,
            mutableFields: {
                title: goalFields.title,
                is_completed: goalFields.isCompleted,
                is_important: goalFields.isImportant,
                description: goalFields.description,
                planned_progress: goalFields.plannedProgress,
                current_progress: goalFields.currentProgress,
                target_completion_date: goalFields.targetCompletionDate,
                creation_date: goalFields.creationDate
            }
        }

        dispatch(updateGoalDetails(data))
    }

    useEffect(() => {
        dispatch(getGoalDetails(id));
        return () => {
            dispatch(resetUserState())
        };
    }, [dispatch, id])

    useEffect(() => {
        if (goal) {
            setGoalFields({
                title: goal.title,
                isCompleted: goal.is_completed,
                isImportant: goal.is_important,
                description: goal.description,
                plannedProgress: goal.planned_progress,
                currentProgress: goal.current_progress,
                targetCompletionDate: goal.target_completion_date,
                creationDate: goal.creation_date,
            })
        }
    }, [goal])


    return (
        <div className={styles.wrapper}>

            <div className={styles.container}>

                <div className={styles.titleFieldFrame}>
                    <GoalCompletedCheckbox
                        id={goal.id}
                        isCompleted={goalFields.isCompleted}
                        onClick={handleStatusCheckboxClick} />
                    <textarea
                        className={`${styles.textarea} ${styles.goalTitle}`}
                        value={goalFields.title || ""}
                        placeholder="Empty"
                        onChange={handleTitleChange} />
                    <GoalImportanceCheckbox
                        id={goal.id}
                        isImportant={goalFields.isImportant}
                        onClick={handleImportanceCheckboxClick} />
                </div>

                <div>
                    <div className={styles.fieldTitle}>Description</div>
                    <textarea
                        className={styles.textarea}
                        value={goalFields.description || ""}
                        placeholder="Empty"
                        onChange={handleDescriptionChange} />
                </div>

                <div>
                    <div className={styles.fieldTitle}>Planned progress</div>
                    <input
                        type="number"
                        className={styles.input}
                        value={goalFields.plannedProgress || ""}
                        placeholder="Empty"
                        onChange={handlePlannedProgressChange} />
                </div>

                <div>
                    <div className={styles.fieldTitle}>Current progress</div>
                    <input
                        type="number"
                        className={styles.input}
                        value={goalFields.currentProgress || ""}
                        placeholder="Empty"
                        onChange={handleCurrentProgressChange} />
                </div>

                <div>
                    <div className={styles.fieldTitle}>Must be completed</div>
                    <input
                        type="text"
                        onFocus={(e) => e.target.type = "date"}
                        className={styles.input}
                        value={goalFields.targetCompletionDate
                            ? new Date(goalFields.targetCompletionDate).toISOString().slice(0, 10)
                            : ""}
                        placeholder="Empty"
                        onChange={handleTargetCompletionDateChange} />
                </div>

                <div className={styles.staticFieldContainer}>
                    <div className={styles.fieldTitle}>Created</div>
                    <div className={styles.dateField}>
                        {goalFields.creationDate
                            ? new Date(goalFields.creationDate).toISOString().slice(0, 10)
                            : ""}
                    </div>
                </div>

                <Button text="Save changes" onClick={handleSaveChangesClick} />

            </div>

        </div>
    )
}

export default GoalPage;
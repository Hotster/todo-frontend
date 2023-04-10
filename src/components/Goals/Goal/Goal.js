import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeGoalImportance, changeGoalStatus } from "../../../app/goalsSlice";
import GoalCompletedCheckbox from "../../GoalCompletedCheckbox/GoalCompletedCheckbox";
import GoalImportanceCheckbox from "../../GoalImportanceCheckbox/GoalImportanceCheckbox";
import styles from "./Goal.module.css";

const Goal = ({ goal }) => {
    const dispatch = useDispatch();

    const handleStatusCheckboxClick = (event) => {
        event.preventDefault();
        dispatch(changeGoalStatus(goal));
    }

    const handleImportanceCheckboxClick = (event) => {
        event.preventDefault();
        dispatch(changeGoalImportance(goal))
    }

    return (

        <Link to={`goals/${goal.id}`} className={[styles.frame, "wrapper"].join(" ")}>

            <div className={styles.frameLeftSide}>
                <GoalCompletedCheckbox id={goal.id} isCompleted={goal.is_completed} onClick={handleStatusCheckboxClick} />
                <div>{goal.title}</div>
            </div>

            <GoalImportanceCheckbox id={goal.id} isImportant={goal.is_important}  onClick={handleImportanceCheckboxClick} />

        </Link>

    )
}

export default Goal;

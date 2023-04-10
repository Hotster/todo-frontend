import styles from "./Goals.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, selectGoals } from "../../app/goalsSlice";
import Goal from "./Goal/Goal";
import GoalCreationForm from "./GoalCreationForm/GoalCreationForm";

const Goals = () => {
    const goals = useSelector(selectGoals);

    const dispatch = useDispatch();

    const goalsInProgress = [];
    const goalsCompleted = [];
    
    goals.map(goal => !goal.is_completed
        ? goalsInProgress.push(goal)
        : goalsCompleted.push(goal));
    goalsCompleted.sort((a, b) => new Date(b.actual_completion_date) - new Date(a.actual_completion_date));

    useEffect(() => {
        dispatch(getGoals());
    }, [dispatch]);

    return (
        <div className={[styles.container, "wrapper"].join(" ")}>

            <div className={styles.title}>Add new goal</div>
            <div className={styles.container}>
                <GoalCreationForm />
            </div>

            <div className={styles.title}>In progress</div>
            <div className={styles.container}>
                {goalsInProgress?.map(goal => <Goal key={goal.id} goal={goal} />)}
            </div>

            <div className={styles.title}>Completed</div>
            <div className={styles.container}>
                {goalsCompleted?.map(goal => <Goal key={goal.id} goal={goal} />)}
            </div>

        </div>
    );
};

export default Goals;
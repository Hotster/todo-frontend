import styles from "./AddGoalButton.module.css";

const AddGoalButton = (props) => {

    return (
        <button className={styles.button} onClick={props.onClick}/>
    );
};

export default AddGoalButton;

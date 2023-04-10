import spinner from "./SpinnerCircle.svg"
import styles from "./SpinnerCircle.module.css"

const SpinnerCircle = () => {
    return (
            <img className={styles.loading} src={spinner} alt="Loading" />
    );
};

export default SpinnerCircle;
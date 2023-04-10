import spinner from "./Spinner.svg"
import styles from "./Spinner.module.css"

const Spinner = () => {
    return (
        <div className="container">
            <img className={styles.loading} src={spinner} alt="Loading" />
        </div>
    );
};

export default Spinner;
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBurger } from "../../app/burgerSlice";
import styles from "./Burger.module.css";

const Burger = (props) => {
    const burger = useSelector(selectBurger);

    return (
        <div className={burger ? styles.burger : styles.openBurger}>
            <div className={styles.burgerLine} />
        </div>
    );
};

export default Burger;

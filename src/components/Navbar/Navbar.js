import styles from "./Navbar.module.css"
import { useState } from "react";
import Menu from "./Menu";
import Burger from "../Burger/Burger";
import { useDispatch, useSelector } from "react-redux";
import { changeState, selectBurger } from "../../app/burgerSlice";

const Navbar = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const dispatch = useDispatch()

    const handleMenuClick = () => {
        // setMenuToggle(!menuToggle);
        dispatch(changeState());
    };

    return (
        <header id="header" className={styles.header}>
            <div className={styles.container}>
                <div className="wrapper">
                    <div className={styles.box}>

                        <div className={styles.logo}>
                            <span className="logo-text">To Do</span>
                        </div>

                        <div className={styles.mobileBtn} onClick={handleMenuClick}>
                            <Burger />
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
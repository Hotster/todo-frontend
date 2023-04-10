import styles from "./Header.module.css"
import Burger from "../Burger/Burger";
import { useDispatch } from "react-redux";

const Header = () => {
    const dispatch = useDispatch()

    const handleMenuClick = () => {
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

export default Header;
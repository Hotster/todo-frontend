import styles from "./MenuItem.module.css"
import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
    return (
        <React.Fragment>

            <NavLink
                to={props.link}
                className={({ isActive }) => isActive
                    ? `${styles.menuItemContainer} ${styles.active}`
                    : styles.menuItemContainer}>
                <div className={styles.menuItemName}>{props.name}</div>
            </NavLink>

        </React.Fragment>
    )
}

export default MenuItem;
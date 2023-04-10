import { NavLink } from "react-router-dom";
import styles from "./FolderItem.module.css"
import React from "react";

const FolderItem = (props) => {
    return (
        <React.Fragment>
            <NavLink
                to={props.link}
                className={({ isActive }) => isActive
                    ? `${styles.folderContainer} ${styles.active}`
                    : styles.folderContainer}>
                <div className={styles.folderName}>{props.name}</div>
            </NavLink>
        </React.Fragment>
    );
};

export default FolderItem;
import styles from "./Sidebar.module.css"
import Menu from "../Menu/MenuList"
import Button from "../Button/Button"
import FoldersList from "../FolderList/FoldersList"
import { useDispatch, useSelector } from "react-redux"
import { createFolder, getFolders, selectFolders } from "../../app/foldersSlice"
import { useEffect, useState } from "react"

const Sidebar = () => {
    const [newFolderName, setNewFolderName] = useState("");
    const folders = useSelector(selectFolders);

    const dispatch = useDispatch();

    const addFolder = (folderName) => {
        const folder = {
            name: folderName
        }

        dispatch(createFolder(folder))
    }

    useEffect(() => {
        dispatch(getFolders());
    }, [dispatch]);

    return (
        <div className={styles.sidebarContainer}>

            <div className={styles.sidebarMenuList}>
                <Menu menuList={[
                    { name: "All goals", link: "/" },
                    { name: "Today", link: "/today" },
                    { name: "Important", link: "/important" },
                    { name: "Calendar", link: "/calendar" },
                ]} />
            </div>

            <FoldersList folderList={folders} />

            <div className={styles.addFolderContainer}>
                <input
                    className={styles.addFolderInput}
                    placeholder="Add new folder"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)} />
                <button className={styles.addFolderButton}
                    type="button"
                    style={!newFolderName ? {display: "none"}: {}}
                    onClick={() => addFolder(newFolderName)} >
                    <div className={styles.addFolderButtonImage} />
                </button>
            </div>

        </div>
    )
}

export default Sidebar;
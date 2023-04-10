import style from "./Navbar.module.css";
import MenuItem from "./MenuItem";

const Menu = (props) => {
    return (
        <ul className={props.menuToggle ? [style.menu, style.menuActive].join(" ") : [style.menu]}>
            {props.menuList.map(item => {
                return <MenuItem key={item.id} name={item.name} />
            })}
        </ul>
    )
}

export default Menu;
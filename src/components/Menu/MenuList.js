import style from "./MenuList.module.css";
import MenuItem from "./MenuItem/MenuItem";

const MenuList = ({ menuList }) => {
    return (
        <div>
            {menuList.map((item, index) => {
                return <MenuItem key={index} name={item.name} link={item.link} />
            })}
        </div>
    );
};

export default MenuList;
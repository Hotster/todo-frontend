import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
    return (
        <Fragment>
            <div className="authContainer">
                <Navbar />

                <div className="contentContainer wrapper">
                    <Sidebar />
                    <Outlet />
                </div>

            </div>
        </Fragment>
    );
};

export default Layout;

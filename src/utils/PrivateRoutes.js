import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { authenticatedUser, selectUser, selectUserStatus } from "../app/userSlice";
import Spinner from "../components/Spinner/Spinner";

const PrivateRoutes = () => {
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userStatus === "idle") {
            dispatch(authenticatedUser());
        }
    }, [userStatus, dispatch]);
    
    return (
        userStatus === "idle" || userStatus === "loading"
            ? <Spinner />
            : (user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />)
    );
};

export default PrivateRoutes;

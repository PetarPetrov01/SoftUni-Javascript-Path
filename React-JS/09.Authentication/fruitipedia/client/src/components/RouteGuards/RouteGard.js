import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export const RouteGuard = ({
    children,
}) => {

    const { user } = useUserContext();

    if (!user?.accessToken) {
        return <Navigate to='/login'></Navigate>;
    }

    return (
        <>
            {children ? children : <Outlet />}
        </>
    );
};
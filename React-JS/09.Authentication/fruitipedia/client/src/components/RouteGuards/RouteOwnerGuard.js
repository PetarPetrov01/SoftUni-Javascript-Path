import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { useFruitsContext } from '../../contexts/FruitsContext';

export const RouteOwnerGuard = ({
    children
}) => {
    const { getFruit } = useFruitsContext();
    const { id: fruitId } = useParams();
    const { user } = useUserContext();

    const fruit = getFruit(fruitId);

    if (fruit && fruit._ownerId !== user?._id) {
        return <Navigate to={`/catalog/${fruitId}`} replace />;
    }

    //Avoid rendering edit page with empty values
    if (fruit === undefined) {
        return;
    }   

    return (
        <>
            {children ? children : <Outlet />}
        </>
    );
};
import { createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from "../hooks/useLocalStorage";
import { userService } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage('user', {});
    const navigate = useNavigate();

    const onLoginSubmit = async (e, data) => {
        e.preventDefault();

        try {
            const user = await userService.login(data);
            setUser(user);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    const onRegisterSubmit = async (e, data) => {
        e.preventDefault();

        try {
            const result = await userService.register(data);

            const user = {
                email: result.email,
                _id: result._id,
                accessToken: result.accessToken
            };

            setUser(user);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    const onLogoutHandler = () => {
        userService.logout();
        setUser({});
    };

    const context = {
        user,
        onLoginSubmit,
        onRegisterSubmit,
        onLogoutHandler
    };

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
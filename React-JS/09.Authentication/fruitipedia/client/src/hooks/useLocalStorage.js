import { useState } from "react";
import { getUser, setUserStorage } from "../services/userStorage";

export const useLocalStorage = (storageKey, initialValue) => {
    const [state, setState] = useState(() => {
        const userState = getUser();
        if (userState) {
            return userState;
        }

        return initialValue;
    });

    const setLocalStorage = (data) => {
        setState(data);
        setUserStorage(storageKey, data);
    };

    return [
        state,
        setLocalStorage
    ];
};
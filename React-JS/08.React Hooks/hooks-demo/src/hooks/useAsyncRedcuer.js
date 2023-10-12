import { useReducer } from "react";

export const useAsyncReducer = (reducer, initial) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const asyncDispatch = async (action) => {
        if (typeof action === 'function') {
            await action(dispatch);
        } else {
            dispatch(action);
        }
    };

    return [state, asyncDispatch];
};
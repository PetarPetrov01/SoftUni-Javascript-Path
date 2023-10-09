import { useState } from "react";

export const useForm = (initial) => {
    const [formValues, setFormValues] = useState(initial);

    const onChangeHandler = (e) => {
        e.preventDefault();
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    return [formValues, onChangeHandler];
};
import { useState } from "react";

export const useForm = (initial) => {

    const [formData, setFormData] = useState(initial);

    const onChangeHandler = (e) => {
        e.preventDefault();
        setFormData(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    return [formData, onChangeHandler];
};
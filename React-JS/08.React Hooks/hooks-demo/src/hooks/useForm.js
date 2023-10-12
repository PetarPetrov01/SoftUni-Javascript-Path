import { useState } from "react";

const useForm = (value) => {
    const [formData, setFormData] = useState(value);

    const onChangeHandler = (e) => {
        e.preventDefault();
        setFormData(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    return { formData, onChangeHandler };
};

export default useForm;
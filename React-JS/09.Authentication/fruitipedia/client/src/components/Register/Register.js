import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { useForm } from '../../hooks/useForm';

export const Register = () => {

    const { onRegisterSubmit } = useContext(UserContext);
    const [values, onChangeHandler] = useForm({
        email: '',
        password: '',
        "re-password": ''
    });

    return (
        <section id="register">
            <div className="form">
                <h2>Register</h2>
                <form className="register-form" onSubmit={(e) => onRegisterSubmit(e, values)}>
                    <input
                        type="text"
                        name="email"
                        id="register-email"
                        placeholder="email"
                        onChange={onChangeHandler}
                        value={values.email}
                    />
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="password"
                        onChange={onChangeHandler}
                        value={values.password}
                    />
                    <input
                        type="password"
                        name="re-password"
                        id="repeat-password"
                        placeholder="repeat password"
                        onChange={onChangeHandler}
                        value={values['re-password']}
                    />
                    <button type="submit">register</button>
                    <p className="message">
                        Already registered? <Link to="#">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

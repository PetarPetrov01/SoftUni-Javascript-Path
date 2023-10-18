import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Login = (props) => {

    const { onLoginSubmit } = useContext(UserContext);
    const { formValues, onChangeHandler } = useForm({
        email: '',
        password: ''
    });

    return (
        <section id="login">
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" onSubmit={(e) => onLoginSubmit(e, formValues)}>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        onChange={onChangeHandler}
                        value={formValues.email} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        onChange={onChangeHandler}
                        value={formValues.password}
                    />
                    <button type="submit">login</button>
                    <p className="message">
                        Not registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

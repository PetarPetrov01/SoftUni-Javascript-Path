import { Link } from "react-router-dom";
import { StyledInput, StyledForm, InputWrapper } from "../../styles/Form/StyledForm";
import { useForm } from "../../hooks/useForm";
import { useUserContext } from "../../contexts/UserContext";

export const Register = () => {

    const { onRegisterSubmit } = useUserContext();
    const { formValues, onChangeHandler } = useForm({
        email: '',
        password: '',
        repass: ''
    });

    return (
        <StyledForm onSubmit={(e) => onRegisterSubmit(e, formValues)}>
            <h1>Sign up</h1>
            <InputWrapper>
                <StyledInput
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formValues.email}
                    onChange={onChangeHandler} />
            </InputWrapper>

            <InputWrapper>
                <StyledInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={onChangeHandler} />
            </InputWrapper>

            <InputWrapper>
                <StyledInput
                    type="password"
                    placeholder="Repeat password"
                    name="repass"
                    value={formValues.repass}
                    onChange={onChangeHandler} />
            </InputWrapper>
            <button>Register</button>
            <p>
                Not registerd? <Link to={'/login'}>Sign in</Link>
            </p>
        </StyledForm>
    );
};
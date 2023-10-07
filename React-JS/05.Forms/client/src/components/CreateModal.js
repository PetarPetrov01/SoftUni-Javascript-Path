import { useContext, useState } from 'react';

import { useForm } from '../hooks/useForm';
import { UserContext } from '../context/UserContext';

export const CreateModal = ({
    onCreateClick,
    user
}) => {
    let userInfo;

    if (user) {
        userInfo = { ...user, ...user.address };
        delete userInfo.address;
    }

    const [formValues, onChangeHandler] = useForm(userInfo || {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        country: '',
        city: '',
        street: '',
        streetNumber: ''
    });

    const [errors, setErrors] = useState({});
    const { showModalHandler } = useContext(UserContext);

    function validateForm(e) {
        const value = e.target.value;

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            const inputsMap = {
                firstName: () => validateLength(value, 3),
                lastName: () => validateLength(value, 3),
                street: () => validateLength(value, 3),
                city: () => validateLength(value, 3),
                email: () => (!value.match(/^[\w.]+@[a-zA-Z]+\.[a-zA-Z]+$/)) && 'Email is not valid!',
                phoneNumber: () => (!value.match(/^0[\d]{9}$/)) && 'Phone number is not valid!',
                imageUrl: () => (!value.match(/^https:\/\//)) && 'ImageUrl is not valid!',
                country: () => validateLength(value, 2),
                streetNumber: () => (Number(value) <= 0) && 'Street number should be a positive number!',
            };

            newErrors[e.target.name] = inputsMap[e.target.name]();

            return newErrors;
        });

        const validateLength = (value, min) => {
            return value.length < min && `${[e.target.name]} should be at least ${min} characters long!`;
        };

    }

    return (
        <div className="overlay">
            <div className="backdrop"></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Edit User/Add User</h2>
                        <button className="btn close" onClick={(e) => showModalHandler(e, null)}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={(e) => onCreateClick(e, formValues, user?._id)}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="firstName" name="firstName" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.firstName} />
                                </div>
                                {errors['firstName'] &&
                                    <p className="form-error">
                                        {errors['firstName']}
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="lastName" name="lastName" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.lastName} />
                                </div>
                                {errors['lastName'] &&
                                    <p className="form-error">
                                        {errors['lastName']}
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-envelope"></i></span>
                                    <input id="email" name="email" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.email} />
                                </div>
                                {errors['email'] &&
                                    <p className="form-error">
                                        {errors['email']}
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-phone"></i></span>
                                    <input id="phoneNumber" name="phoneNumber" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.phoneNumber} />
                                </div>
                                {errors['phoneNumber'] &&
                                    <p className="form-error">
                                        {errors['phoneNumber']}
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span><i className="fa-solid fa-image"></i></span>
                                <input id="imageUrl" name="imageUrl" type="text"
                                    onChange={onChangeHandler}
                                    onBlur={validateForm}
                                    value={formValues.imageUrl} />
                            </div>
                            {errors['imageUrl'] &&
                                <p className="form-error">
                                    {errors['imageUrl']}
                                </p>
                            }
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input id="country" name="country" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.country} />
                                </div>
                                {errors['country'] &&
                                    <p className="form-error">
                                        {errors['country']}
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-city"></i></span>
                                    <input id="city" name="city" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.city} />
                                </div>
                                {errors['city'] &&
                                    <p className="form-error">
                                        {errors['city']}
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input id="street" name="street" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.street} />
                                </div>
                                {errors['street'] &&
                                    <p className="form-error">
                                        {errors['street']}
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-house-chimney"></i></span>
                                    <input id="streetNumber" name="streetNumber" type="text"
                                        onChange={onChangeHandler}
                                        onBlur={validateForm}
                                        value={formValues.streetNumber} />
                                </div>
                                {errors['streetNumber'] &&
                                    <p className="form-error">
                                        {errors['streetNumber']}
                                    </p>
                                }
                            </div>
                        </div>
                        <div id="form-actions">
                            {Object.values(errors).some(v => v !== false)
                                ? <button id="action-save" className="btn" type="submit" disabled>Save</button>
                                : <button id="action-save" className="btn" type="submit" >Save</button>
                            }

                            <button id="action-cancel" className="btn" type="button" onClick={(e) => showModalHandler(e, null)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export const Edit = () => {
    const { onEditHandler } = usePropertyContext();

    const { id } = useParams();
    const { errors, validateForm } = usePropertyValidator({});
    
    const [formValues, setFormValues] = useState({
        name: '',
        location: '',
        imageUrl: '',
        price: '',
        area: '',
        description: '',
    });
    return (
        <StyledForm onSubmit={handleSubmit}>
            <h1>Edit property</h1>
            <InputWrapper>
                <StyledInput
                    name="name"
                    placeholder="Name"
                    onChange={onChangeHandler}
                    value={formValues.name}
                    onBlur={validateForm}
                />
                {errors.name &&
                    <p>{errors.name}</p>
                }
            </InputWrapper>

            <InputWrapper>
                <StyledInput
                    name="location"
                    placeholder="Location"
                    onChange={onChangeHandler}
                    value={formValues.location}
                    onBlur={validateForm} />


                {errors.location &&
                    <p>{errors.location}</p>
                }
            </InputWrapper>

            <InputWrapper>
                <StyledInput
                    name="imageUrl"
                    placeholder="Image"
                    onChange={onChangeHandler}
                    value={formValues.imageUrl}
                    onBlur={validateForm} />

                {errors.imageUrl &&
                    <p>{errors.imageUrl}</p>
                }
            </InputWrapper>

            <InputWrapper>
                <StyledInput
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={onChangeHandler}
                    value={formValues.price}
                    onBlur={validateForm} />

                {errors.price &&
                    <p>{errors.price}</p>
                }
            </InputWrapper>

            <InputWrapper>
                <StyledInput
                    type="number"
                    name="area"
                    placeholder="Area"
                    onChange={onChangeHandler}
                    value={formValues.area}
                    onBlur={validateForm} />

                {errors.area &&
                    <p>{errors.area}</p>
                }
            </InputWrapper>
            <InputWrapper>
                <StyledTextArea
                    name="description"
                    placeholder="Description"
                    onChange={onChangeHandler}
                    value={formValues.description}
                    onBlur={validateForm} />

                {errors.description &&
                    <p>{errors.description}</p>
                }
            </InputWrapper>

            <button>Edit</button>
        </StyledForm>
    );
};
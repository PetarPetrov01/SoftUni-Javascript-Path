import { useState } from "react"

export const CreateForm = ({
    onSubmitHandler
}) => {

    const [values, setValues] = useState({
        name: '',
        age: ''
    });

    const onChangeHandler = (e) => {
        e.preventDefault()
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }

    return (
        <form onSubmit={(e) => onSubmitHandler(e, values)}
            style={{
                display: "flex",
                gap: "10px",
                border: "1px solid",
                borderRadius: "5px",
                padding: "20px",
                margin: 'auto'
            }}>
            <div style={{ display: "flex", gap: "10px" }}>
                <label for="name">Name:</label>
                <input type="text" name="name" value={values.name} onChange={onChangeHandler}></input>

                <label for="age">Age:</label>
                <input type="text" name="age" value={values.age} onChange={onChangeHandler}></input>
            </div>
            <button type="submit">Submit</button>
        </form >
    )
}
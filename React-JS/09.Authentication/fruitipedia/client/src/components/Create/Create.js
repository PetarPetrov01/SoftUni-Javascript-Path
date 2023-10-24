import { useFruitsContext } from "../../contexts/FruitsContext";
import { useForm } from "../../hooks/useForm";

export const Create = (props) => {
    const { onCreateHandler } = useFruitsContext();
    const { formValues, onChangeHandler } = useForm({
        name: '',
        imageUrl: '',
        description: '',
        nutrition: ''
    });

    return (<section id="create">
        <div className="form">
            <h2>Add Fruit</h2>
            <form className="create-form" onSubmit={(e) => onCreateHandler(e, formValues)}>
                <input type="text" name="name" id="name" placeholder="Fruit Name" value={formValues.name} onChange={onChangeHandler} />
                <input
                    type="text"
                    name="imageUrl"
                    id="Fruit-image"
                    placeholder="Fruit Image"
                    value={formValues.imageUrl}
                    onChange={onChangeHandler}
                />
                <textarea
                    id="fruit-description"
                    name="description"
                    placeholder="Description"
                    rows={10}
                    cols={50}
                    value={formValues.description}
                    onChange={onChangeHandler}
                />
                <textarea
                    id="fruit-nutrition"
                    name="nutrition"
                    placeholder="Nutrition"
                    rows={10}
                    cols={50}
                    value={formValues.nutrition}
                    onChange={onChangeHandler}
                />
                <button type="submit">Add Fruit</button>
            </form>
        </div>
    </section>);
};
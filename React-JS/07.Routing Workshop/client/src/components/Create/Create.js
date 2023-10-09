import { useForm } from "../hooks/useForm";

export const Create = ({
    onCreateHandler
}) => {

    const [form, onChangeHandler] = useForm({
        name: '',
        imageUrl: '',
        description: '',
        nutrition: ''
    });
    
    return (<section id="create">
        <div className="form">
            <h2>Add Fruit</h2>
            <form className="create-form" onSubmit={(e) => onCreateHandler(e, form)}>
                <input type="text" name="name" id="name" placeholder="Fruit Name" value={form.name} onChange={onChangeHandler} />
                <input
                    type="text"
                    name="imageUrl"
                    id="Fruit-image"
                    placeholder="Fruit Image"
                    value={form.imageUrl}
                    onChange={onChangeHandler}
                />
                <textarea
                    id="fruit-description"
                    name="description"
                    placeholder="Description"
                    rows={10}
                    cols={50}
                    value={form.description}
                    onChange={onChangeHandler}
                />
                <textarea
                    id="fruit-nutrition"
                    name="nutrition"
                    placeholder="Nutrition"
                    rows={10}
                    cols={50}
                    value={form.nutrition}
                    onChange={onChangeHandler}
                />
                <button type="submit">Add Fruit</button>
            </form>
        </div>
    </section>);
};
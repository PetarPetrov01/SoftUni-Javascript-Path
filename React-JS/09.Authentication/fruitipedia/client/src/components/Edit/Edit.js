export const Edit = ({
    onEditHanlder
}) => {
    return (
        <section id="edit">
            <div className="form">
                <h2>Edit Fruit</h2>
                <form className="edit-form" onSubmit={(e) => onEditHanlder(e, id, formData)}>
                    <input type="text" name="name" id="name" placeholder="Fruit Name" value={formData.name} onChange={onChangeHandler} />
                    <input
                        type="text"
                        name="imageUrl"
                        id="Fruit-image"
                        placeholder="Fruit Image URL"
                        value={formData.imageUrl}
                        onChange={onChangeHandler}
                    />
                    <textarea
                        id="fruit-description"
                        name="description"
                        placeholder="Description"
                        rows={10}
                        cols={50}
                        value={formData.description}
                        onChange={onChangeHandler}
                    />
                    <textarea
                        id="fruit-nutrition"
                        name="nutrition"
                        placeholder="Nutrition"
                        rows={10}
                        cols={50}
                        value={formData.nutrition}
                        onChange={onChangeHandler}
                    />
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    );
};
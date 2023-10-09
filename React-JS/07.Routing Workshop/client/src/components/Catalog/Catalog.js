import { FruitItem } from "./FruitItem";

export const Catalog = ({
    fruits
}) => {

    return (
        <>
            <h2>Fruits</h2>
            {fruits
                ? <section id="dashboard">
                    {/* Display a div with information about every post (if any)*/}
                    {fruits.map(f => <FruitItem key={f._id} {...f} />)}
                </section>
                : <h2>No fruit info yet.</h2>
            }
        </>
    );
};

import { Link } from "react-router-dom";

export const FruitItem = ({
    _id,
    name,
    description,
    imageUrl
}) => {

    return (
        <div className="fruit">
            <img src={imageUrl} alt="example1" />
            <h3 className="title">{name}</h3>
            <p>{description}</p>
            <Link className="details-btn" to={`/catalog/${_id}`}>
                More Info
            </Link>
        </div>);
};

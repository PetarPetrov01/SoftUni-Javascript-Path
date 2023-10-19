import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as fruitService from '../../services/fruitService';
import { UserContext } from "../../contexts/UserContext";

export const Details = ({
    onDeleteHandler
}) => {
    const [fruit, setFruit] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fruitService.getById(id)
            .then(result => setFruit(result));
    }, [id]);

    const { user } = useContext(UserContext);


    return (

        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src={fruit.imageUrl} alt="example1" />
                <p id="details-title">{fruit.name}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p>{fruit.description}</p>
                        <p id="nutrition">Nutrition</p>
                        <p id="details-nutrition">{fruit.nutrition}</p>
                    </div>
                    {/*Edit and Delete are only for creator*/}
                    {user._id === fruit._ownerId &&
                        <div id="action-buttons">
                            <Link to={`/catalog/${fruit._id}/edit`} id="edit-btn">
                                Edit
                            </Link>
                            <button onClick={(e) => onDeleteHandler(e, fruit._id)} id="delete-btn">
                                Delete
                            </button>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};


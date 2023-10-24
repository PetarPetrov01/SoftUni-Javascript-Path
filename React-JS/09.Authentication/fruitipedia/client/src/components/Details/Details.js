import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as fruitService from '../../services/fruitService';
import { UserContext } from "../../contexts/UserContext";
import { DeleteModal } from "../Delete/DeleteModal";

export const Details = (props) => {

    const [showDelete, setShowDelete] = useState(false);
    const [fruit, setFruit] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fruitService.getById(id)
            .then(result => setFruit(result));
    }, [id]);

    const { user } = useContext(UserContext);

    const onDeleteClick = () => {
        setShowDelete(true);
    };

    const onCloseClick = () => {
        setShowDelete(false);
    };

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
                            <button onClick={onDeleteClick} id="delete-btn">
                                Delete
                            </button>
                        </div>
                    }

                    {showDelete && <DeleteModal
                        fruit={fruit}
                        onCloseClick={onCloseClick} />}
                </div>
            </div>
        </section>
    );
};


import { useFruitsContext } from "../../contexts/FruitsContext";

export const DeleteModal = ({
    fruit,
    onCloseClick
}) => {

    const { onDeleteHandler } = useFruitsContext();

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Are you sure you want to delete {fruit.name}?</p>
                <div className="btn-container">
                    <button className="delete-confirm" onClick={(e) => onDeleteHandler(e, fruit._id)}>Delete</button>
                    <button className="delete-cancel" onClick={onCloseClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
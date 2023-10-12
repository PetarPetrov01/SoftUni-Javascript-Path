import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';
import { CreateForm } from './CreateForm';
import { ItemContext } from '../../context/ItemContext';


export const CreateModal = ({ show }) => {
    const { onCloseClick } = useContext(ItemContext);
    return (
        <Modal
            onHide={onCloseClick}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={onCloseClick}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateForm />
            </Modal.Body>
        </Modal>
    );
};
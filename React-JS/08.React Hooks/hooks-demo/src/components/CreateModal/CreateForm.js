import { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ItemContext } from '../../context/ItemContext';
import useForm from '../../hooks/useForm';

export const CreateForm = () => {

    const { formData, onChangeHandler } = useForm({
        name: '',
        imageUrl: '',
        price: '',
        description: ''
    });
    const { onCloseClick, onCreateSubmit } = useContext(ItemContext);


    return (
        <Form onSubmit={(e) => onCreateSubmit(e, formData)}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title"
                    name="name"
                    onChange={onChangeHandler}
                    value={formData.name} />

                <Form.Label>ImageUrl</Form.Label>
                <Form.Control type="text" placeholder="ImageUrl"
                    name="imageUrl"
                    onChange={onChangeHandler}
                    value={formData.imageUrl} />

                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Price"
                    name="price"
                    onChange={onChangeHandler}
                    value={formData.price} />

                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' type="text" placeholder="Description"
                    name="description"
                    onChange={onChangeHandler}
                    value={formData.description} />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={onCloseClick}>Close</Button>
            </Form.Group>
        </Form>
    );
};
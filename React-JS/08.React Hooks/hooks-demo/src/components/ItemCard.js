import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ItemCard = ({
    name,
    description,
    price,
    _id,
    imageUrl
}) => {
    return (
        <div className="d-flex justify-content-around">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imageUrl} style={{ width: '286px', height: '180px' }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Text>
                        Price: ${price}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

        </div>
    );
};


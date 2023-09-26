import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GiBed } from "react-icons/gi";
import { BsArrowRight } from "react-icons/bs";

const HotelBook = ({ hotel }) => {
    const { id, name, bed, price, picture, about } = hotel
    return (
      <div className='container col-3 m-5 '>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {about}
                </Card.Text>
                <p className='text-secondary fw-semibold fs-5'>price: {price}</p>
                 <div className='d-flex justify-content-between'>
                 <h5 className=' fw-semibold'><GiBed />: {bed}</h5>
                <Link  to='/booking'>
                <Button  variant="primary">Book Now <BsArrowRight /></Button>
                </Link>
                 </div>
            </Card.Body>
        </Card>
        </div>
    );
};

export default HotelBook;
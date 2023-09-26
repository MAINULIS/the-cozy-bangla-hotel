import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Your order is received. Stay with us');
<Toaster
    toastOptions={{
        className: '',
        style: {
            border: '1px solid #713200',
            padding: '16px',
            color: 'red',
        },
    }}
/>

const Booking = () => {
    const [success, setSuccess] = useState('');

    const submitForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        setSuccess(`${name} Your Order Has Been Received.Thanks For Stay With Us`)
        e.target.reset();
    }
    return (
        <div className='m-5 w-50 mx-auto'>
            <h3 className='pb-4 text-secondary fw-semibold'>Please Fill Up The Form To Book Hotel</h3>
            <Form onSubmit={submitForm}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter full name" required />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Current Address" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Address </Form.Label>
                    <Form.Control placeholder="Permanent Address" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Country </Form.Label>
                    <Form.Control placeholder="Country Name" required />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Coupon</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <p className='p-2 text-success'>{success}</p>

                <Button onClick={notify} variant="primary" type="submit">
                    Submit
                </Button>
                <Toaster
                    toastOptions={{
                        className: '',
                        style: {
                            border: '1px solid #713200',
                            padding: '16px',
                            color: 'red',
                        },
                    }}
                />
            </Form>
        </div>
    );
};

export default Booking;
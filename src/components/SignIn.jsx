import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../contextProvider/AuthProvider';
import { Link } from 'react-router-dom';


const SignIn = () => {
    const { LogIn, resetPassword } = useContext(AuthContext);
    const emailRef = useRef();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignIn = e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        LogIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User has been successfully logged in');
                e.target.reset();
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }
    // if forget password
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password');
            return;
        }
        resetPassword(email)
            .then(() => {
                alert('Please check your email');
            })
            .catch(error => {
                setError(error.message)
                setSuccess('');
            })
    }

    return (
        <div className='m-5 w-50 container'>
            <div>
                <h3 className='text-center m-4 fw-semibold'>Sign In Now</h3>
            </div>
            <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your full Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Your Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>

                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div>
                    <Link
                        to="/signUp" className='text-decoration-none text-secondary'>
                        <small>
                            New to this site? please? <button className="btn btn-active btn-link text-xs">Sign Up</button>
                        </small>
                    </Link>
                    <p className='text-zinc-600'><small>Forget password? Please</small> <button onClick={handleResetPassword} className="btn btn-active btn-link text-xs">Reset Password</button></p>
                </div>
            </Form>
        </div>
    );
};

export default SignIn;
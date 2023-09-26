import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../contextProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaGoogle, FaGithub } from 'react-icons/fa6'


const SignIn = () => {
    const { LogIn, resetPassword, signInWithGoogle,signInWithGithub } = useContext(AuthContext);
    const emailRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const from = location.state?.from?.pathname || '/';

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [show, setShow] = useState(false);

    let eye = {
        marginLeft: -35,
    }

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
                navigate(from, {replace:true})
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })

    }
    // sign in with google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User successfully sign in with Google');
                setError('');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    // sign in with github
    const handleGithubSignIn = () =>{
        signInWithGithub()
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess('User successfully sign in with Github');
            setError('');
        })
        .catch(error =>{
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
                    <Form.Control type="text" name='name' placeholder="Your Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className='d-flex'>
                        <Form.Control type={show ? "text" : "password"} name='password' placeholder="Password" required />
                        <h5 style={eye} onClick={() => setShow(!show)}>
                            {
                                show ? <BsEyeSlash /> : <BsEye />
                            }
                        </h5>
                    </div>
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
            <Button onClick={handleGoogleSignIn} className='mb-2 w-50' variant="outline-primary">  <FaGoogle /> Login With Google</Button> <br />
            <Button onClick={handleGithubSignIn} className='w-50' variant="outline-secondary"><FaGithub /> Login With Github</Button>
        </div>
    );
};

export default SignIn;
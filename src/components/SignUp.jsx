import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contextProvider/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';

const SignUp = () => {
    const {createUser} = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignUp=(e) =>{
        e.preventDefault();
        setError('');
        setSuccess('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(name, email, password, confirmPassword);
        if(password !== confirmPassword){
            setError('Password did not match')
            return;
        }
       
        createUser(email, password)
        .then(result =>{
            const newUser = result.user;
            console.log(newUser);
            e.target.reset();
            setSuccess('User has been successfully created account')
            emailForVerification(result.user);
            setError('');
        })
        .catch(error =>{
            setError(error.message);
            setSuccess('');
        })
    } 
     
    const emailForVerification = (user) =>{
        sendEmailVerification(user)
        .then(result =>{
            console.log(result);
            alert('Please check your email and verify the email')
        })
    }
     // uncontrolled component => controlled component
     const handlePassword = (e) =>{
        const passwordInput = e.target.value;
        setPassword(passwordInput);
        if(!/(?=.*\d.*\d)/.test(passwordInput)){
            setPasswordError('Please you at least 2 digit in your password')
        }
        else if(!/(?=.*[!@#$%*&])/.test(passwordInput)){
            setPasswordError('Password must contain at least one special character')
        }
        else if(passwordInput.length <6){
            setPasswordError('Password must be at least 6 characters long')
        }
        else{
            setPasswordError('');
        }
     }
    return (
        <div className='m-5 w-50 container'>
            <h3 className='text-center m-4 fw-semibold'>Register Now</h3>
           <div>
           <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your full Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Your Name"  required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={password} onChange={handlePassword} placeholder="Password" required />
                    {passwordError && <span className='text-danger'>{passwordError}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name='confirmPassword' placeholder="Password" required />
                </Form.Group>
                
                 <p className='text-danger'>{error}</p>
                 <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div>
                <Link to="/signIn" className='text-decoration-none text-secondary'>
                    <small>
                    Already have an account? please<button className="btn btn-active btn-link text-xs ">Login</button>
                    </small>
                </Link>
                </div>
            </Form>
           </div>
        </div>
    );
};

export default SignUp;
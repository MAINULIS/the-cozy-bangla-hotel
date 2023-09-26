import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contextProvider/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';
import { BsEye, BsEyeSlash} from "react-icons/bs";

const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    let eye ={
        marginLeft: -35,
    }

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
        <div className='m-5 w-50 container mx-auto '>
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
                   <div className='d-flex '>
                   <Form.Control type={show ? "text" : "password"} name='password' value={password} onChange={handlePassword} placeholder="Password" required />
                    <h5  style={eye} onClick={()=>setShow(!show)}>
                    {
                        show ? <BsEyeSlash /> : <BsEye />
                    }
                    </h5>
                   </div>
                    
                    {passwordError && <span className='text-danger'>{passwordError}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className='d-flex'>
                    <Form.Control type={show ? "text" : "password"} name='confirmPassword' placeholder="Password" required />
                    <h5  style={eye} onClick={()=>setShow(!show)}>
                    {
                        show ? <BsEyeSlash /> : <BsEye />
                    }
                    </h5>
                    </div>
                </Form.Group>
                
                 <p className='text-danger'>{error}</p>
                 <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Sign Up
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
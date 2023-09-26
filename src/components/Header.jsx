import React, { useContext } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contextProvider/AuthProvider';

const Header = () => {
  const {user, logOut} = useContext(AuthContext);
  
  const handleSignOut = () =>{
    logOut()
    .then( ()=>{

    })
    .catch(error =>{
      console.log(error)
    })
  }
    
    return (
       
        <Navbar expand="lg" className='py-4 bg-secondary-subtle'>
          <Container className='fw-bold '>
              <NavLink className="text-decoration-none" to="/">The Cozy Bangla Hotel</NavLink>
              <Nav className=' d-flex justify-content-between' >
                <NavLink className="text-decoration-none " to="/">Home</NavLink>
                <NavLink className="text-decoration-none ms-4 " to="/booking">Booking</NavLink>
                {
                  user && <NavLink className="text-decoration-none ms-4 " to="/orders">My Orders</NavLink>
                }
                {
                  user ?
                  <NavLink onClick={handleSignOut} className="text-decoration-none ms-4" to="/signIn">Sign Out</NavLink>
                  :
                <NavLink className="text-decoration-none ms-4" to="/signIn">Sign In</NavLink>
                }
                <NavLink className="text-decoration-none ms-4" to="/signUp">Sign Up</NavLink>
              </Nav>
          </Container>
        </Navbar>
       
    );
};

export default Header;
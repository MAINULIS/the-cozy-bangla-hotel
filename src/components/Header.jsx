import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    
    return (
       
        <Navbar expand="lg" className='py-4 bg-secondary-subtle'>
          <Container className='fw-bold '>
              <NavLink className="text-decoration-none" to="/">The Cozy Bangla Hotel</NavLink>
              <Nav className=' d-flex justify-content-between' >
                <NavLink className="text-decoration-none " to="/">Home</NavLink>
                <NavLink className="text-decoration-none ms-4 " to="/booking">Booking</NavLink>
                <NavLink className="text-decoration-none ms-4" to="/signIn">Sign In</NavLink>
                <NavLink className="text-decoration-none ms-4" to="/signUp">Sign Up</NavLink>
              </Nav>
          </Container>
        </Navbar>
       
    );
};

export default Header;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { cartCountSelector } from '../redux/store'
import { Link } from 'react-router-dom';

import React from 'react'

export const Header = () => {
    const cartCount = useSelector(cartCountSelector);

    return (
        <Navbar sticky="top" expand="xl" className="bg-body-tertiary" bg="primary" >
            <Container>
                <Navbar.Brand className="card-text lead  fs-3">
                    ShoppingMart🛍️
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                    <div className='buttons'>
                        <Nav className="me-right">
                            <Nav.Link as={Link} to="/cart"><button className='btn btn-outsline-dark'>Cart <span className="badge">{cartCount}</span>
                            </button></Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}



export default Header;
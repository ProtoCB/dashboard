import React from 'react';
import { Link } from 'react-router-dom';
import { navbarImg, navbarBrand } from './headerStyle'
import { Navbar } from 'react-bootstrap';

const Header = (props) => {
    return (
        <div style={ navbarImg }>
            <Navbar  variant="dark" expand="lg">
                <Navbar.Brand style={navbarBrand} as={Link} to="/">
                     ProtoCB
                </Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default Header;














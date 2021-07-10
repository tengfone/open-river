import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import './Header.css'
import logo from '../assets/logo.png'

function Header() {
    return (
        <>
            <Navbar bg="default" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <a href="/">
                    <Navbar.Brand>
                        <img src={logo} style={{ height: 40, width: 40 }} alt="Site Logo" />
                        <h4 className='brandName'>OpenRiver</h4>
                    </Navbar.Brand>
                </a>

                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header
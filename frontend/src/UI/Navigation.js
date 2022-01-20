import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

const Navigation = () => {
    return(
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Your recipe book </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/recipes">Recipes</Nav.Link>
                                <Nav.Link href="/cuisines">Cuisines</Nav.Link>
                                <Nav.Link href="/form">Add new recipe</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
    )
}

export default Navigation;

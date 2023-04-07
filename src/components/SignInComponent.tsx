import React from "react";
import '../App.css';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import FleetLogoIcon from '../assets/fleetlogo.png';
import { Outlet, Link } from 'react-router-dom';


function SignIn(): JSX.Element {



    return (
        <div>
            <Container fluid>
                <Row >
                    <Col xs={5} className="align-self-center">
                        <Row className="justify-content-center">
                            <Row className="justify-content-center mb-5">
                                <Col className="col-5 d-flex justify-content-end p-0">
                                    <img className="loginFleetLogo" src={FleetLogoIcon} alt="Fleet Finder logo" />
                                </Col>
                                <Col className="col-7 p-0">
                                    <p className="text-start fs-1">FleetFinder</p>
                                </Col>
                            </Row>
                            <Col className="col-4 d-flex flex-column align-items-center loginBox">
                                <Form className="d-flex flex-column align-items-center">
                                    <Form.Group controlId="emailLoginInput">
                                        <Form.Label visuallyHidden>Email</Form.Label>
                                        {/* <Form.Control className="mt-5" type="email" placeholder="Email"></Form.Control> */}
                                        <input type="email" className="mt-5 loginInput" placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group controlId="passwordLoginInput">
                                        <Form.Label visuallyHidden>Password</Form.Label>
                                        <input type="password" className="mt-3 loginInput" placeholder="Password" />
                                    </Form.Group>
                                    <Button type="submit" className="signInButton mt-3 text-white">Sign In</Button>
                                </Form>

                                <Row className="mt-5">
                                    <Col>
                                        {/* Set link to correct path... */}
                                        
                                        <p>Don't have an account? <Nav.Link as={Link} to="/SignUp">Sign Up</Nav.Link></p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={7} className="splashImg p-0">

                        <Row className="m-0">
                            <Col className="col-12 text-center d-flex flex-column align-content-center p-0">
                                <div className="splashText">
                                    <p className="m-0 mt-2">The <span className="yellowText">ultimate solution</span></p>
                                    <p>for managing your trailers.</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </div >
    );
}

export default SignIn;

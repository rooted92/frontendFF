import React from "react";
import '../App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';


function SignIn(): JSX.Element {

    

    return (
        <div>
            <Container fluid>
                <Row >
                    <Col xs={5} className="align-self-center">
                        <Row className="justify-content-center">
                            <h1 className="text-center">FleetFinder</h1>
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
                                        {/* <Link to="/SignUp">Sign Up</Link> */}
                                        <p>Don't have an account? </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={7} className="splashImg p-0">

                    </Col>
                </Row>
            </Container >
        </div >
    );
}

export default SignIn;
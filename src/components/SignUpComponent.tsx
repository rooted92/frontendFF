import React from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import FleetFinderIcon from '../assets/fleetlogo.png';
import Footer from "./FooterComponent";

import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const SignUp = (): JSX.Element => {
    return (
        <>
            <Container className="mx-4">
                <Row className="py-5 w-100 d-flex justify-content-between m-0">
                    <Col className="col-6 d-flex flex-row justify-content-center leftSignUpColumn rounded rounded-4">
                        <Row className="d-flex w-100 justify-content-center">
                            <Col className="col-12 d-flex flex-column align-items-center justify-content-center">
                                <img src={FleetFinderIcon} alt="Fleet Finder Icon" className="fleetFinderIconSignUp" />
                                <p className="d-inline-flex">Fleet Finder</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-5">
                        <p className="fs-1 fw-bold mb-4">Sign Up</p>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} className="col-12 mb-3" controlId="accountType">
                                    <Form.Label>Account Type</Form.Label>
                                    <Form.Select className="inputFieldStyle" defaultValue="Select Account Type">
                                        <option>Select Account Type</option>
                                        <option>Dispatcher</option>
                                        <option>Driver</option>
                                        <option>Organization</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control className="inputFieldStyle" type="text" placeholder="First Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control className="inputFieldStyle" type="text" placeholder="Last Name" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control className="inputFieldStyle" type="text" placeholder="555-555-5555" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="inputFieldStyle" type="email" placeholder="user@example.com" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="inputFieldStyle" type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="organizationName">
                                <Form.Label>Organization Name</Form.Label>
                                <Form.Control className="inputFieldStyle" type="text" placeholder="Name of your company" />
                            </Form.Group>

                            <Button
                                className="createAccountBtn mt-3"
                                variant="primary"
                                type="submit">
                                Create Account
                            </Button>
                        </Form>
                        <Row className="mt-3">
                            <Col>
                                <p className="text-center">Already have an account? <Nav.Link className="d-inline blueText" as={Link} to='/'>Sign In!</Nav.Link></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            {/* <Footer /> */}
        </>
    )
}

export default SignUp;
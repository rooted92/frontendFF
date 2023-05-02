import React, { useEffect, useState } from "react";
// import '../App.css';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import FleetFinderIcon from '../assets/fleetlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Login, GetLoggedInUserData } from "../services/DataService";

const SignIn = (): JSX.Element => {

    const [userInfo, setUserInfo] = useState({
        id: null,
        name: null,
        email: null,
        phoneNumber: null,
        organizationID: null,
        accountType: null,
        isDarkMode: null
    });
    const [token, setToken] = useState({
        token: null,
    });

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log(token);
        if (token.token != null) {
            try {
                localStorage.setItem('Token', token.token);

                console.log(userInfo);
                if (userInfo.accountType === 'Driver') {
                    navigate("/DriverDashboard");
                } else if(userInfo.accountType === 'Dispatcher') {
                    navigate("/DispatchDashboard");
                } else if(userInfo.accountType === 'Admin'){
                    navigate("/AdminAccount");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }, [userInfo]);

    let navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
   
    const handleLogin = async () => {
        let userData = {
            email,
            password
        }

        console.log(userData);

        setToken(await Login(userData));
        setUserInfo(await GetLoggedInUserData(email));
    }


    return (
        <div>
            <Container fluid>
                <Row >
                    <Col xs={5} className="align-self-center">
                        <Row className="justify-content-center">
                            <Row className="justify-content-center mb-4">
                                <Col className="col-12 d-flex flex-row justify-content-center">
                                    <img className="loginFleetLogo" src={FleetFinderIcon} alt="Fleet Finder logo" />
                                    <p className="text-start fs-1 pt-2">FleetFinder</p>
                                </Col>
                            </Row>
                            <Col className="col-4 d-flex flex-column align-items-center loginBox">
                                <Form className="d-flex flex-column align-items-center">
                                    <Form.Group controlId="emailLoginInput">
                                        <Form.Label visuallyHidden>Email</Form.Label>
                                        {/* <Form.Control className="mt-5" type="email" placeholder="Email"></Form.Control> */}
                                        <input
                                            required
                                            type="email"
                                            className="mt-5 loginInput"
                                            placeholder="Email"
                                            // Destructuring 'e' object
                                            onChange={({ target: { value } }) => {
                                                setEmail(value)
                                                // console.log(value);
                                            }} />
                                    </Form.Group>
                                    <Form.Group controlId="passwordLoginInput">
                                        <Form.Label visuallyHidden>Password</Form.Label>
                                        <input
                                            required
                                            type="password"
                                            className="mt-3 loginInput"
                                            placeholder="Password"
                                            onChange={({ target: { value } }) => {
                                                setPassword(value)
                                                // console.log(value);
                                            }} />
                                    </Form.Group>
                                    <Button
                                        // type="submit"
                                        className="signInButton mt-3 text-white"
                                        onClick={handleLogin} >Sign In</Button>
                                </Form>

                                <Row className="mt-5 signUpText">
                                    <Col className="col-12 p-0">
                                        {/* Set link to correct path... */}
                                        <p>Don't have an account? <Nav.Link as={Link} to="/SignUp" className="blueText d-inline">Sign Up!</Nav.Link></p>
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

export {SignIn};

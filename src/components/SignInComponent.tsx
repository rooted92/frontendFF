import React, { useEffect, useState } from "react";
// import '../App.css';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import FleetFinderIcon from '../assets/fleetlogo.png';
import LoadingPageComponent from "./LoadingPageComponent";
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [errorClass, setErrorClass] = useState<string>('');

    useEffect(() => {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        // console.log(token);
        if (token.token != null) {
            try {
                sessionStorage.setItem('Token', token.token);
                // console.log(userInfo);
                if (userInfo.accountType === 'Driver') {
                    navigate("/DriverDashboard");
                } else if (userInfo.accountType === 'Dispatcher') {
                    navigate("/DispatchDashboard");
                } else if (userInfo.accountType === 'Admin') {
                    navigate("/AdminDashboard");
                }
            }
            catch (err) {
                // console.log(err);
            }
        }
    }, [userInfo]);

    let navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState('');
    const [isValid, setValid] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        let userData = {
            email,
            password
        }

        // console.log(userData);
        const newToken = await Login(userData);
        // console.log(newToken)
        setToken(newToken);
        // console.log(token);
        if (typeof newToken === 'string') {
            setErrorMsg(newToken);
            setErrorClass('col-8 bg-dark my-4 border rounded')
            setIsLoading(false);
            return;
        }
        setErrorClass('')
        setUserInfo(await GetLoggedInUserData(email));
        setIsLoading(false);
    }

    // const validateEmail = () => {
    //     if (email == userInfo.email) {
    //         console.log('Correct Email')
    //     } else {
    //         console.log('Please Enter Correct Email');
    //     }
    // };

    const handleEmailChange = (event: any) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        setValid(validateEmail(inputEmail));
    };

    const validateEmail = (email: any) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (password: string) => {
        if (!passwordPattern.test(password)) {
            setErrorMessage(
                'Password must be at least eight characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            );
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div>
            {
                isLoading ?
                    <>
                        <LoadingPageComponent />
                    </>
                    :
                    <>
                        <Container fluid>
                            <Row>
                                <Col className="d-none d-lg-block col-lg-4 col-xl-5 align-self-center">
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
                                                        value={password}
                                                        className="mt-3 loginInput"
                                                        placeholder="Password"
                                                        onChange={({ target: { value } }) => {
                                                            setPassword(value);
                                                            // console.log(value);
                                                        }} />
                                                        {errorMessage}
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
                                    <Row className="justify-content-center">
                                        <Col className="col-8">
                                            <p className="text-danger fw-bold text-center mt-3">{errorMsg}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* This form will show in screens 768px or smaller */}
                                <Col className="d-lg-none smScreenColBgImg vh-100">
                                    <Row className="justify-content-center mb-4 mt-5">
                                        <Col className="col-12 d-flex flex-row justify-content-center">
                                            <img className="loginFleetLogo" src={FleetFinderIcon} alt="Fleet Finder logo" />
                                            <p className="text-start text-white fs-1 pt-2">FleetFinder</p>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col className="col-4 align-items-center mt-5 loginBox bg-white">
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
                                                            setPassword(value);
                                                            // console.log(value);
                                                        }} />
                                                </Form.Group>
                                                <Button
                                                    // type="submit"
                                                    className="signInButton mt-3 text-white"
                                                    onClick={handleLogin} >Sign In</Button>
                                            </Form>

                                            <Row className="mt-5 signUpText">
                                                <Col className="col-12 p-0 text-center">
                                                    {/* Set link to correct path... */}
                                                    <p>Don't have an account? <Nav.Link as={Link} to="/SignUp" className="blueText d-inline">Sign Up!</Nav.Link></p>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col className={errorClass}>
                                            <p className="text-danger fw-bold text-center mt-3">{errorMsg}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-12 mt-5 text-center d-flex flex-column align-content-center p-0">
                                            <div className="splashTextSmall">
                                                <p className="m-0 mt-5 fs-2">The <span className="yellowText">ultimate solution</span></p>
                                                <p className="fs-2">for managing your trailers.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="d-none d-lg-block col-lg-8 col-xl-7 splashImg p-0">
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
                    </>
            }

        </div >
    );
}

export { SignIn };

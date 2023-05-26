import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FleetFinderIcon from '../assets/fleetlogo.png';
import { useEffect, useState } from "react";
import { CreateUserAccount, CreateOrganization } from "../services/DataService";

const SignUp = (): JSX.Element => {

    // Create type for userAccountInfo object
    type UserAccountType = {
        Name?: string | null,
        Email?: string | null,
        PhoneNumber?: string | null,
        OrganizationJoinCode?: string | null,
        AccountType?: string | null,
        Password?: string | null
    }

    let navigate = useNavigate();
    const [account, setAccount] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [organizationInput, setOrganizationInput] = useState<string>('');
    const [organizationJoinCode, setOrganizationJoinCode] = useState<string>('');
    const [label, setLabel] = useState<string>('');
    const [placeHolder, setPlaceHolder] = useState<string>('');
    const [isOrgCreated, setIsOrgCreated] = useState<boolean>(false);
    const [createdUserStr, setCreatedUserStr] = useState<string>('');
    const [isValid, setValid] = useState(false);

    const [userAccountInfo, setUserAccountInfo] = useState({});

    useEffect(() => {
        if (account === 'Admin') {
            setLabel('Organization Name');
            setPlaceHolder('Enter company name');
        } else {
            setLabel('Organization Join Code');
            setPlaceHolder('Enter join code');
        }
    }, [account]);

    useEffect(() => {

        if (account === 'Dispatcher' || account === 'Driver') {
            setOrganizationJoinCode(organizationInput);
        }
    }, [organizationInput]);

    useEffect(() => {
        setUserAccountInfo({
            Name: `${lastName}, ${firstName}`,
            Email: email,
            PhoneNumber: phoneNumber,
            OrganizationJoinCode: organizationJoinCode,
            AccountType: account,
            Password: password
        });
    }, [lastName, firstName, email, phoneNumber, organizationJoinCode, account, password]);

    useEffect(() => {
        console.log(userAccountInfo);
    }, [userAccountInfo]);

    useEffect(() => {
        if (account === 'Admin' && isOrgCreated == true) {
            CreateAdminUser();
        }
    }, [userAccountInfo]);

    const CreateAdminUser = async () => {
        console.log(userAccountInfo);
        setCreatedUserStr(await CreateUserAccount(userAccountInfo));
    }

    useEffect(() => {
        const validateAccount = (joinCode: any, type: any) => {
            if (createdUserStr === 'Incorrect Organization Code') {
                // Incorrect organzition code
                alert(createdUserStr)
            } else if (createdUserStr === 'User Already Exists') {
                alert(createdUserStr)
            } else if (createdUserStr === 'User Account Created') {
                // take them to signup if account was created
                // User account created
                // console.log(createdUserStr);
                navigate(`/SignUpConfirmation/${joinCode}/${type}`);
            }
        }
        validateAccount(organizationJoinCode, account);
    }, [createdUserStr]);

    const handleCreateAccount = async () => {
        if (account === 'Admin') {
            // console.log(organizationInput);
            setOrganizationJoinCode(await CreateOrganization({ Name: organizationInput }));
            setIsOrgCreated(true);
        } else {
            CreateAdminUser();
        }
    }

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
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const validatePassword = (password: string) => {
        if (!passwordPattern.test(password)) {
            setIsPasswordValid(false);
        } else if (passwordPattern.test(password)) {
            setIsPasswordValid(true);
        }
    };

    // useEffect(() => {
    //     validatePassword(password);

    //   }, [password]);

    return (
        <>
            <div className="pageContainer">
                <Container className="mx-auto d-none d-lg-block">
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
                                        <Form.Select
                                            className="inputFieldStyle"
                                            defaultValue="Select Account Type"
                                            // placeholder="Select Account Type"
                                            onChange={e => {
                                                setAccount(e.target.value);
                                                // HandleSetLabelAndPlaceholder(e.target.value);
                                            }}>
                                            <option disabled>Select Account Type</option>
                                            <option value='Dispatcher'>Dispatcher</option>
                                            <option value='Driver'>Driver</option>
                                            <option value='Admin'>Organization</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="First Name"
                                            onChange={e => setFirstName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={e => { setLastName(e.target.value) }} />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="tel"
                                        placeholder="(555)-555-5555"
                                        pattern='([0-9]{3})-[0-9]{3}-[0-9]{4}'
                                        onChange={e => { setPhoneNumber(e.target.value) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="email"
                                        placeholder="user@example.com"
                                        onChange={e => {
                                            setEmail(e.target.value)
                                            validateEmail(e.target.value);

                                        }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="password"
                                        placeholder="Password"
                                        onChange={e => {
                                            setPassword(e.target.value)
                                            validatePassword(e.target.value)
                                        }
                                        } />
                                    {
                                        !isPasswordValid ?
                                            <p className="text-danger mt-1 fs-6">Password must be at least 8 characters with one uppercase, one lowercase and one special character.</p>
                                            :
                                            <p className="text-success mt-1">Valid password.</p>
                                    }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="organizationNameAndCode">
                                    <Form.Label>{label}</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="text"
                                        placeholder={placeHolder}
                                        onChange={e => { setOrganizationInput(e.target.value) }} />
                                </Form.Group>

                                <Button
                                    className="createAccountBtn mt-3"
                                    variant="primary"
                                    // type="submit"
                                    onClick={handleCreateAccount}>
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
                <Container className="mx-auto d-block d-lg-none">
                    <Row className="justify-content-center mt-5">
                        <Col className="col-12 d-flex justify-content-center">
                            <img src={FleetFinderIcon} alt="Fleet Finder Icon" height={'90rem'} width={'auto'} />
                            <p className="d-inline-flex align-self-center fs-1 m-0">Fleet Finder</p>
                        </Col>
                        <Col className="col-10 mt-3">
                            <p className="fs-1 fw-bold mb-4">Sign Up</p>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="col-12 mb-3" controlId="accountType">
                                        <Form.Label>Account Type</Form.Label>
                                        <Form.Select
                                            className="inputFieldStyle"
                                            defaultValue="Select Account Type"
                                            // placeholder="Select Account Type"
                                            onChange={e => {
                                                setAccount(e.target.value);
                                                // HandleSetLabelAndPlaceholder(e.target.value);
                                            }}>
                                            <option disabled>Select Account Type</option>
                                            <option value='Dispatcher'>Dispatcher</option>
                                            <option value='Driver'>Driver</option>
                                            <option value='Admin'>Organization</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="First Name"
                                            onChange={e => setFirstName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={e => { setLastName(e.target.value) }} />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="tel"
                                        placeholder="(555)-555-5555"
                                        pattern='([0-9]{3})-[0-9]{3}-[0-9]{4}'
                                        onChange={e => { setPhoneNumber(e.target.value) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="email"
                                        placeholder="user@example.com"
                                        onChange={e => {
                                            setEmail(e.target.value)
                                            validateEmail(e.target.value);

                                        }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="password"
                                        placeholder="Password"
                                        onChange={e => {
                                            setPassword(e.target.value)
                                            validatePassword(e.target.value)
                                        }
                                        } />
                                    {
                                        isPasswordValid ?
                                            <p className="text-danger mt-1 fs-6">Password must be at least 8 characters with one uppercase, one lowercase and one special character.</p>
                                            :
                                            <p className="text-success mt-1">Valid password.</p>
                                    }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="organizationNameAndCode">
                                    <Form.Label>{label}</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="text"
                                        placeholder={placeHolder}
                                        onChange={e => { setOrganizationInput(e.target.value) }} />
                                </Form.Group>

                                <Button
                                    className="createAccountBtn mt-3"
                                    variant="primary"
                                    // type="submit"
                                    onClick={handleCreateAccount}>
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
            </div>
        </>
    )
}

export default SignUp;
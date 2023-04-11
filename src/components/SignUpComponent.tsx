import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FleetFinderIcon from '../assets/fleetlogo.png';
import { useEffect, useState } from "react";
import { CreateUserAccount, GetOrganizationByJoinCode } from "../services/DataService";

const SignUp = (): JSX.Element => {

    // TODO - Create an object that will hold sign up form data
    // For dispatch/driver check ther organziation code then create account
    // run two endpoints check code and create account
    // if ADMIN vvv
    // For admin, create organization fistr then create amdmin user account
    // so have two functions one that wil first create org using org endpoint
    // then another to create amin account
    // (organiztion if deleted will need to delete whole organization not just admin account) 
    // const [inputs, setInputs] = useState({
    //     "ID": 0,
    //     "Name": null,
    //     "Email": null,
    //     "PhoneNumber": null,
    //     "OrganizationID": null,
    //     "AccountType": null,
    //     "Password": null
    // });

    // Using union types to let typescript know the data type will either be null or a string/number
    let accountInfo = {};
    let navigate = useNavigate();
    const [account, setAccount] = useState<null | string>(null);
    const [firstName, setFirstName] = useState<null | string>(null);
    const [lastName, setLastName] = useState<null | string>(null);
    const [phoneNumber, setPhoneNumber] = useState<null | string>(null);
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [organizationId, setOrganizationId] = useState<null | number>(null);
    const [organizationName, setOrganizationName] = useState<null | string>(null);
    const [joinCode, setJoinCode] = useState<null | string>(null);
    const [label, setLabel] = useState<string>('');
    const [placeHolder, setPlaceHolder] = useState<string>('');



    const handleCreateAccount = async () => {
        // first fetch organziation by join code
        // set orgId in this fetch
        let organizationModel = await GetOrganizationByJoinCode(joinCode);
        console.log(organizationModel.ID)
        if (organizationModel.length === 0) {
            alert('Organization not found.');
        } else if (organizationModel > 0) {
            setOrganizationId(organizationModel.ID);
        }

        // then create user if organzition exist
        accountInfo = {
            ID: 0,
            Name: `${lastName}, ${firstName}`,
            Email: email,
            PhoneNumber: phoneNumber,
            OrganizationID: organizationId,
            AccountType: account,
            Password: password
        }
        let isCreated = await CreateUserAccount(accountInfo);
        console.log(isCreated);
        if (!isCreated) {
            alert('Did not work')
        } else if (isCreated) {
            // take them to signup if account was created
            navigate('/SignUpConfirmation');
        }

    }

    useEffect(() => {
        console.log(account);
    }, [account]);

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
                                    <Form.Select
                                        className="inputFieldStyle"
                                        defaultValue="Select Account Type"
                                        onChange={e => { setAccount(e.target.value) }}>
                                        <option>Select Account Type</option>
                                        <option value='Dispatcher'>Dispatcher</option>
                                        <option value='Driver'>Driver</option>
                                        <option value='Organization'>Organization</option>
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
                                    onChange={e => { setEmail(e.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="inputFieldStyle"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => { setPassword(e.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="organizationName">
                                <Form.Label>Organization Name</Form.Label>
                                <Form.Control
                                    className="inputFieldStyle"
                                    type="text"
                                    placeholder="Name of your company"
                                    onChange={e => { setOrganizationName(e.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="joinCode">
                                <Form.Label>Organization Join Code</Form.Label>
                                <Form.Control
                                    className="inputFieldStyle"
                                    type="text"
                                    placeholder="Enter join code"
                                    onChange={e => { setJoinCode(e.target.value) }} />
                            </Form.Group>

                            <Button
                                className="createAccountBtn mt-3"
                                variant="primary"
                                type="submit"
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
        </>
    )
}

export default SignUp;
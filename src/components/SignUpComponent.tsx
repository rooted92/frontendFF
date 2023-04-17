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

    // Create type for userAccountInfo object
    type UserAccountType = {
        Name?: string | null,
        Email?: string | null,
        PhoneNumber?: string | null,
        OrganizationJoinCode?: string | null,
        AccountType?: string | null,
        Password?: string | null
    }

    // Using union types to let typescript know the data type will either be null or a string/number
    let userAccountInfo: UserAccountType  = {};
    
    let navigate = useNavigate();
    const [account, setAccount] = useState<null | string>(null);
    const [firstName, setFirstName] = useState<null | string>(null);
    const [lastName, setLastName] = useState<null | string>(null);
    const [phoneNumber, setPhoneNumber] = useState<null | string>(null);
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [organizationName, setOrganizationName] = useState<null | string>(null);
    const [joinCode, setJoinCode] = useState<null | string>(null);
    const [label, setLabel] = useState<string>('');
    const [placeHolder, setPlaceHolder] = useState<string>('');


    // if account is dispatcher or driver hide organization name and only display join code
    // else if admin display organization name and hide join code
    const HandleSetLabelAndPlaceholder = (account: string | null) => {
        if (account === 'Dispatcher' || account === 'Driver') {
            setLabel('Organization Join Code');
            setPlaceHolder('Enter join code');
            console.log('Account is dispatcher or driver');
        } else if (account === 'Organization') {
            setLabel('Organization Name');
            setPlaceHolder('Enter company name');
            console.log('account is admin');
        } else {
            setLabel('');
            setPlaceHolder('');
        }
    }

    const handleCreateAccount = async () => {
        // first fetch organziation by join code
        // set orgId in this fetc

        // then create user if organzition exist

        userAccountInfo = {
            Name: `${lastName}, ${firstName}`,
            Email: email,
            PhoneNumber: phoneNumber,
            OrganizationJoinCode: joinCode,
            AccountType: account,
            Password: password
        }

        // create org
        // org created then -> create acc
        // checks if org name matches anoter, chec first if that 

        console.log('Before calling fetch: ', userAccountInfo);
        let createdUserStr = await CreateUserAccount(userAccountInfo);
        // console.log(createdUserStr);
        // console.log(userAccountInfo);
        console.log(userAccountInfo.OrganizationJoinCode);

        if (createdUserStr === 'Incorrect Organization Code') {
            // Incorrect organzition code
            alert(createdUserStr)
        } else if (createdUserStr === 'User Already Exists') {
            alert(createdUserStr)
        } else if (createdUserStr === 'User Account Created') {
            // take them to signup if account was created
            // User account created
            // console.log(createdUserStr);
            navigate('/SignUpConfirmation');
        } else if (createdUserStr === 'Error Nothing Saved To Table') {
            console.error(createdUserStr);
        }

        // if admin and usr already exists


    }



    return (
        <>
            <div className="pageContainer">
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
                                            onChange={e => {
                                                setAccount(e.target.value);
                                                // HandleSetLabelAndPlaceholder(e.target.value);
                                            }}
                                            onClick={() => HandleSetLabelAndPlaceholder(account)} >
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

                                <Form.Group className="mb-3" controlId="organizationNameAndCode">
                                    <Form.Label>{label}</Form.Label>
                                    <Form.Control
                                        className="inputFieldStyle"
                                        type="text"
                                        placeholder={placeHolder}
                                        onChange={e => {
                                            if (label === 'Organization Name') {
                                                setOrganizationName(e.target.value)
                                            } else if (label === 'Organization Join Code') {
                                                setJoinCode(e.target.value);
                                            }

                                        }} />
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
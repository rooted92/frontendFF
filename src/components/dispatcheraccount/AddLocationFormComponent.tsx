import { useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import { useState, useEffect } from "react";
import { AddNewLocation } from "../../services/DataService";


const AddLocationForm = () => {

    const [userInfo, setUserInfo] = useState({
        id: undefined,
        name: undefined,
        email: undefined,
        phoneNumber: undefined,
        organizationID: undefined,
        accountType: undefined,
        isDarkMode: undefined
    });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

    let navigate = useNavigate();
    const [locationName, setLocationName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zip, setZip] = useState<string>('');

    const handleCancel = () => {
        // checking witch account is logged in to route to correct dashboard
        if(userInfo.accountType === 'Dispatcher'){
           navigate('/DispatchDashboard'); 
        } else if (userInfo.accountType === 'Admin') {
            navigate('/AdminDashboard');
        }
        
    }

    const handleAddLocation = async () => {
        console.log('submitted');
        console.log('OrG ID', userInfo.organizationID);
        let yardObject = {
            Name: locationName,
            Address: address,
            City: city,
            State: state,
            Zipcode: zip,
            OrganizationID: userInfo.organizationID,
        }
        console.log(yardObject);
        let newLocation = await AddNewLocation(yardObject, userInfo.id);
        console.log(newLocation);
        if (newLocation) {
            navigate('/YardAddedConfirmation');
        } else if (!newLocation) {
            alert('Location not added');
        }
    }

    return (
        <>
            <div className="pageContainer">
                <div className='mainContent'>
                    {/* Navbar here */}
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col className="col-6 col-md-4 addLocationForm p-4">
                                <h2 className="text-center fw-bold">Add New Location</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="locationName">
                                        <Form.Label visuallyHidden>Location Name</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="Name of Location"
                                            onChange={e => { setLocationName(e.target.value) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Label visuallyHidden>Address</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="Address"
                                            onChange={e => { setAddress(e.target.value) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="city">
                                        <Form.Label visuallyHidden>City</Form.Label>
                                        <Form.Control
                                            className="inputFieldStyle"
                                            type="text"
                                            placeholder="City"
                                            onChange={e => { setCity(e.target.value) }} />
                                    </Form.Group>
                                    <Row>
                                        <Col className="col-8">
                                            <Form.Group className="mb-3" controlId="state">
                                                <Form.Label visuallyHidden>State</Form.Label>
                                                <Form.Control
                                                    className="inputFieldStyle"
                                                    type="text"
                                                    placeholder="State"
                                                    onChange={e => { setState(e.target.value) }} />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col-4">
                                            <Form.Group className="mb-3" controlId="zip">
                                                <Form.Label visuallyHidden>Zip</Form.Label>
                                                <Form.Control
                                                    className="inputFieldStyle"
                                                    type="text"
                                                    placeholder="Zip"
                                                    onChange={e => { setZip(e.target.value) }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-6">
                                            <Button
                                                className="btn bg-danger border-danger w-100"
                                                onClick={handleCancel}>Cancel</Button>
                                        </Col>
                                        <Col className="col-6">
                                            <Button
                                                className="btn lightBlueBG w-100"
                                                onClick={handleAddLocation}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default AddLocationForm;
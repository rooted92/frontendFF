import { useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";


const AddLocationForm = () => {

    let navigate = useNavigate();

    const handleCancel = () => {
        navigate('/DispatchDashboard');
    }

    const handleSubmit = () => {
        console.log('submitted');
        navigate('/ConfirmationMessage');
    }

    return (
        <>
            <div className="pageContainer">
                <div className='mainContent'>
                    {/* Navbar here */}
                    <NavbarComponent />
                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col className="col-4 addLocationForm p-4">
                                <h2 className="text-center fw-bold">Add New Location</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="locationName">
                                        <Form.Label visuallyHidden>Location Name</Form.Label>
                                        <Form.Control className="inputFieldStyle" type="text" placeholder="Name of Location" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Label visuallyHidden>Address</Form.Label>
                                        <Form.Control className="inputFieldStyle" type="text" placeholder="Address" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="city">
                                        <Form.Label visuallyHidden>City</Form.Label>
                                        <Form.Control className="inputFieldStyle" type="text" placeholder="City" />
                                    </Form.Group>
                                    <Row>
                                        <Col className="col-8">
                                            <Form.Group className="mb-3" controlId="state">
                                                <Form.Label visuallyHidden>State</Form.Label>
                                                <Form.Control className="inputFieldStyle" type="text" placeholder="State" />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col-4">
                                            <Form.Group className="mb-3" controlId="zip">
                                                <Form.Label visuallyHidden>Zip</Form.Label>
                                                <Form.Control className="inputFieldStyle" type="text" placeholder="Zip" />
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
                                            onClick={handleSubmit}>Submit</Button>
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
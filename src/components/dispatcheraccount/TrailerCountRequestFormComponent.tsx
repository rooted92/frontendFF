
import { useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";

const TrailerCountRequestForm = (): JSX.Element => {

    let navigate = useNavigate();

    const handleCancel = () => {
        navigate('/DispatchDashboard');
    }

    const handleSubmit = () => {
        console.log('submitted!');
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    {/* Navbar Here */}
                    <NavbarComponent />
                    <Container className="my-5">
                        
                        <Row className="d-flex justify-content-center">
                            <Col className="col-4 requestForm p-4">
                                <h2 className="text-center fw-bold">Trailer Count Request</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="yardLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Location</option>
                                            <option value="Napa Yard">Napa Yard</option>
                                            <option value="PPP Yard">PPP Yard</option>
                                            <option value="U.S. Cold McClellan">U.S. Cold McClellan</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="driver">
                                        <Form.Label>Driver</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Driver</option>
                                            <option value="Napa Yard">Drew Nilsson</option>
                                            <option value="PPP Yard">Manuel Leyva</option>
                                            <option value="U.S. Cold McClellan">Pedro Castaneda</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Row className="mt-3">
                                        <Col className="col-6">
                                            <Button
                                            className="bg-danger btn border-danger w-100"
                                            onClick={handleCancel} >
                                                Cancel
                                            </Button>

                                        </Col>
                                        <Col className="col-6 d-flex flex-row justify-content-end">
                                            <Button
                                            className="lightBlueBG btn w-100" 
                                            onClick={handleSubmit} >
                                                Submit
                                            </Button>
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
    )
}

export default TrailerCountRequestForm;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import WelcomeMessage from "../WelcomeMsgComponent";
import { Button, Col, Container, Row, Accordion, Card } from "react-bootstrap";

// Create a models folder and import from there trailer, driver, etc. models

const DispatchDashboard = (): JSX.Element => {

    // useLocation grabs the current pathname
    const location = useLocation();
    console.log(typeof location.pathname);

    let navigate = useNavigate();

    const handleRequest = () => {
        navigate('/TrailerCountRequestForm');
    }

    const [truckNumber, setTruckNumber] = useState(0);
    const [routeName, setRouteName] = useState('');

    return (
        <>
            {/* Template for Dispatch Dashboard (also template for how pages will be structured out to avoid issues with footer not staying in place) */}
            <div className="pageContainer">
                <div className="mainContent">
                    {/* import dashboard here */}
                    <Container className="mt-5">
                        <Row className="d-flex justify-content-between mb-3">
                            <Col className="col-4">
                                <p className="fs-3">Yard Locations</p>
                            </Col>
                            <Col className="col-4 d-flex justify-content-end align-self-start">
                                <Button className="mx-2 lightBlueBG" onClick={handleRequest}>Request Trailer Count</Button>
                                <Button className="darkBlueBG">Add Location</Button>
                            </Col>
                        </Row>
                        {/* Accordion to view trailers currently in transit */}
                        <Row>
                            <Col className="col-12">
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>In Transit</Accordion.Header>
                                        <Accordion.Body>
                                            <Row className="d-flex justify-content-start">
                                                {/* Here we will map though in transit array and create col-4 for each trailer in transit */}
                                                <Col className="col-4 mb-3 align-self-center">
                                                    <div className="trailerInTransit rounded d-flex justify-content-around">
                                                        <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                    </div>
                                                </Col>
                                                <Col className="col-4 mb-3 align-self-center">
                                                    <div className="trailerInTransit rounded d-flex justify-content-around">
                                                        <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                    </div>
                                                </Col>
                                                <Col className="col-4 mb-3 align-self-center">
                                                    <div className="trailerInTransit rounded d-flex justify-content-around">
                                                        <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                    </div>
                                                </Col>
                                                <Col className="col-4 mb-3 align-self-center">
                                                    <div className="trailerInTransit rounded d-flex justify-content-around">
                                                        <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>
                        <Row className="my-5 d-flex justify-content-center">
                            {/* here we will map through the yard locations array and create col-3 divs for each card. */}
                            <Col className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-3 d-flex flex-column align-items-center">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Napa Yard</Card.Title>
                                        <Card.Text>
                                            <Row className="d-flex justify-content-around">
                                                <Col className="col-4 text-nowrap">
                                                    <p>Empty: 12</p>
                                                    <p>Loaded: 8</p>
                                                    <p>Clean: 4</p>
                                                    <p>Dirty: 1</p>
                                                </Col>
                                                <Col className="col-4 text-nowrap">
                                                    <p>Dry Vans: 10</p>
                                                    <p>Reefers: 4</p>
                                                    <p>Tankers: 6</p>
                                                    <p>Total: 20</p>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                        <Row className="d-flex justify-content-center">
                                            <Col className="col-6">
                                                <Button className="darkBlueBG">View Details</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="m-0 mt-4 text-center">Last updated on: Feb 24, 2023 9:36AM</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                        </Row>
                    </Container>
                    <WelcomeMessage checkURL={location.pathname} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default DispatchDashboard;
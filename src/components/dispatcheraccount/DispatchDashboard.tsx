import React from "react";
import Footer from "../FooterComponent";
import { Button, Col, Container, Row, Accordion, Card } from "react-bootstrap";
import '../../App.css';

const DispatchDashboard = () => {
    return (
        <>
            {/* import dashboard here */}
            {/* Template for Dispatch Dashboard */}
            <Container className="mt-5">
                <Row className="d-flex justify-content-between mb-3">
                    <Col className="col-4">
                        <p className="fs-3">Yard Locations</p>
                    </Col>
                    <Col className="col-4 d-flex justify-content-end align-self-start">
                        <Button className="mx-2 lightBlueBG">Request Trailer Count</Button>
                        <Button className="darkBlueBG">Add Location</Button>
                    </Col>
                </Row>
                {/* Accordion to view trailers currently in transit */}
                <Row>
                    <Col className="col-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>In Transit</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="d-flex justify-content-start">
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
                <Row className="mt-5 d-flex justify-content-start">
                    <Col className="col-3">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Napa Yard</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DispatchDashboard;
import React from "react";
import Footer from "../FooterComponent";
import { Button, Col, Container, Row, Accordion } from "react-bootstrap";
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
                <Row>
                    <Col className="col-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>In Transit</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="d-flex justify-content-around">
                                        <Col className="col-3 mx-1 trailerInTransit rounded mb-3 align-self-center">
                                            <p className="m-0 p-2">316 In Transit <span className="blueText">Assigned To - Pedro Castaneda</span></p>
                                        </Col>
                                        <Col className="col-3 trailerInTransit rounded mb-3">
                                            <p className="m-0 p-2">316 In Transit <span>Assigned To - Pedro Castaneda</span></p>
                                        </Col>
                                        <Col className="col-3 trailerInTransit rounded mb-3">
                                            <p className="m-0 p-2">316 In Transit <span>Assigned To - Pedro Castaneda</span></p>
                                        </Col>
                                        <Col className="col-3 trailerInTransit rounded mb-3">
                                            <p className="m-0 p-2">316 In Transit <span>Assigned To - Pedro Castaneda</span></p>
                                        </Col>
                                        <Col className="col-3 trailerInTransit rounded mb-3">
                                            <p className="m-0 p-2">316 In Transit <span>Assigned To - Pedro Castaneda</span></p>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DispatchDashboard;
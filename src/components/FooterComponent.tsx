import React from "react";
import { Col, Container, Row, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import FleetFinderIcon from '../assets/fleetlogo.png';

const Footer = (): JSX.Element => {
    return (
        <Container fluid className="w-100 mt-3 footer">
            <Row className="h-100 d-flex justify-content-between">
                <Col className="col-4 align-self-center">
                    <p className="m-0">&#169; 2023</p>
                </Col>
                <Col className="col-4 d-flex justify-content-center">
                    <Row>
                        <Col className="col-12 d-flex flex-md-column align-items-center">
                            <img src={FleetFinderIcon} alt="Fleet Finder Icon" className="footerIcon mt-3" />
                            <p className="m-0 pt-3 pt-md-0">Fleet Finder</p>
                        </Col>
                    </Row>
                </Col>
                <Col className="col-4 text-end align-self-center">
                    <Nav.Link as={Link} to="#">Back to Top</Nav.Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;

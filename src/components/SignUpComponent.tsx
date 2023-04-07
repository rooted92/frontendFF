import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FleetFinderIcon from '../assets/fleetlogo.png';

const SignUp = (): JSX.Element => {
    return (
        <>
            <Container>
                <Row>
                    <Col className="col-6 darkBlueBG rounded">
                        <img src={FleetFinderIcon} alt="Fleet Finder Icon" />
                        <p>Fleet Finder</p>
                    </Col>
                    <Col className="col-6">
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SignUp;
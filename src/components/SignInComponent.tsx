import React from "react";
import '../App.css';
import {Container, Row, Col} from 'react-bootstrap';


function SignIn() {

    return(
        <div>
            <Container fluid>
                <Row >
                    <Col xs={5} className="align-self-center">
                        <Row className="justify-content-center">
                            <h1 className="text-center">FleetFinder</h1>
                            <Col className="col-4 justify-content-center rounded loginBox">
                                <input type="text" className="my-5" />
                                <input type="text" className="mb-3" />                                
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={7} className="splashImg p-0">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignIn;
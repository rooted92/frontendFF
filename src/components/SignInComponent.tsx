import React from "react";
import '../App.css';
import {Container, Row, Col} from 'react-bootstrap';


function SignIn() {

    return(
        <>
            <Container>
                <Row className="">
                    <Col xs={6}>
                        test
                        <Row>
                            <Col >
                                <p className="col-4 text-center bg-dark">Test</p>                                    
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        test
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SignIn;
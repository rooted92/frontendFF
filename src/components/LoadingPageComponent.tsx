import React from 'react'
import TruckIcon from '../assets/frontal-truck.svg';
import '../App.css'
import { Col, Container, Row } from 'react-bootstrap';

const LoadingPageComponent = (): JSX.Element => {

    return (
        <div>
            <Container>
                <Row>
                    <Col className='d-flex flex-column justify-content-center vh-100 pulsating'>
                        <img height={'82rem'} width={'auto'} src={TruckIcon} alt="truck loading icon" />
                        <p className='fs-4 fw-bold text-center'>Loading...</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoadingPageComponent;
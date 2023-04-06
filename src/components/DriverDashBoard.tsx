import React from 'react'
import '../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button } from 'react-bootstrap'
import Logo from '../Asset/FleetLogo.png'
import Bell from '../Asset/Bell.png'

export default function DriverDashBoard() {
    return (
        <div className='brColor'>
            <Navbar expand="lg">
                <Container >
                    <h3 className='fleetCustomize'> <img src={Logo} alt='Fleet Logo' height='30px' /> Fleet Finder </h3>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <h6 className='dashCuz'> <span className='bellNoti'> <img src={Bell} alt='Fleet Logo' height='25px' /> </span> Dashboard <span className='accCount'> Account </span> </h6>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row className='rowCardCuz'>
                    <Col className='cardCuz'>
                        <Card style={{ width: '30rem', height: '20rem' }}>
                            <Card.Body className='borderColor'>
                                <Card.Title className='text-center'> Past Submissions </Card.Title>
                                <Card.Text>
                                   
                                </Card.Text>
                               
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='cardCuz'>
                    <Card style={{ width: '15rem', height: '3rem' }}>
                            <Card.Body className='cbCuz'>
                                <Card.Title className='text-center subCuz'> +Submit Trailer Count </Card.Title>
                                <Card.Text>
                                   
                                </Card.Text>
                               
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>







        </div>

    )
}

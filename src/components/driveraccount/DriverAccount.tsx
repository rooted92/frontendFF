import React from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button, Form, ListGroup } from 'react-bootstrap'
import Logo from '../../assets/fleetlogo.png'
import Bell from '../../assets/Bell.png'
import NavbarComponent from '../NavbarComponent'
import Footer from '../FooterComponent'

export default function DriverAccount() { 
    return (
        <div>
            <NavbarComponent />

            <Container>
                <Row>
                    <Col className='pt-4'>
                        <h6 className='aCuz'>Account</h6>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col lg={4} className='pt-3'>
                        <ListGroup>
                            <ListGroup.Item className='listCuz'>Driver </ListGroup.Item>
                            <ListGroup.Item className='listCuz'>Email: </ListGroup.Item>
                            <ListGroup.Item className='listCuz'>Phone: </ListGroup.Item>
                            <ListGroup.Item className='listCuz'>Name: </ListGroup.Item>
                            <ListGroup.Item className='text-center pt-4 listCuz' style={{height: '5rem'}}> <Button variant='danger'> Delete Account </Button> </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

            <Row className='footCuz'>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </div>
    )
}

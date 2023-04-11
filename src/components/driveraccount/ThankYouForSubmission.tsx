import React from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button, Form } from 'react-bootstrap'
import Logo from '../../assets/fleetlogo.png'
import Bell from '../../assets/Bell.png'
import NavbarComponent from '../NavbarComponent'

export default function ThankYouForSubmission() {
  return (
    <div>
        <NavbarComponent />

        <Container>
            <Row>
                <Col>
                <h4 className='text-center tfysCuz'>Thanks for your submission!</h4>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row>
                <Col className='d-flex justify-content-center pt-4'>
                <Button className='buttonColor'>View DashBoard</Button>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

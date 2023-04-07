import React from 'react'
import '../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import Logo from '../Asset/FleetLogo.png'

export default function SignUpConfirmation() {
  return (
    <Container>
        <Row>
            <Col className='d-flex justify-content-center signCuz'>
            <img src={Logo} alt='Fleet Logo' height='150px' />
            </Col>
        </Row>

        <Container>
            <Row>
                <Col className='d-flex justify-content-center'>
                <h1 className='pt-3 wellCuz'>Fleet Finder</h1>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row>
                <Col>
                <h5 className='text-center suCuz pt-5'>Thanks for signing up!</h5>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row>
                <Col className='siButton text-center'>
                <Button>Sign In</Button>
                </Col>
            </Row>
        </Container>
    </Container>
  )
}

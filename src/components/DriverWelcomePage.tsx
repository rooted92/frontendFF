import React from 'react'
import '../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import Logo from '../Asset/FleetLogo.png'
import Bell from '../Asset/Bell.png'

export default function DriverWelcomePage() {
  return (
    <div className='brColor'>
       <Navbar expand="lg">
      <Container >
        <h3 className='fleetCustomize'> <img src={Logo} alt='Fleet Logo' height='30px' /> Fleet Finder </h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">  
        <h6 className='dashCuz'> <span className='bellNoti'> <img src={Bell} alt='Fleet Logo' height='25px' /> </span> Dashboard <span className='accCount'> Account </span> </h6> 
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container>
        <Row className='yardCuz'>
            <Col>
            <h5>Yard Locations  <span className='butCuz'> <Button> Add Location </Button></span>  </h5>
            </Col>
        </Row>
    </Container>

    <Container>
        <Row>
            <Col>
            <h1 className='text-center welcomeCuz'>Welcome </h1>
            </Col>
        </Row>
    </Container>

    <Container>
        <Row>
            <Col>
            <h3 className='text-center wellCuz'>To get started follow the steps below:</h3>
            </Col>
        </Row>
    </Container>

    <Container>
        <Row>
            <Col className='d-flex justify-content-center'>
            <ol>
                <li>
                    Hello
                </li>
            </ol>
            </Col>
        </Row>
    </Container>






   </div>
   


  )
}

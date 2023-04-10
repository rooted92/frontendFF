import React from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import Logo from '../../assets/fleetlogo.png'
import Bell from '../../assets/Bell.png'

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
            <ol className='stepsCuz'>
                <li>
                Start by clicking on the 'Add Location' button, which is located in <br/> the top right corner of your dashboard.
                </li>
                <li>
                Once you click on the button, you'll be directed to a form. Fill out <br/> the required information in the form to add a new yard location <br/> to your dashboard.  
                </li>
                <li>
                Once you have completed the form, click on the 'Submit' button.
                </li>
                <li>
                After submitting the form, your new location will be added to <br/> your dashboard.
                </li>
            </ol>
            </Col>
        </Row>
    </Container>






   </div>
   


  )
}

import React from 'react'
import '../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Logo from '../assets/fleetlogo.png'
import Bell from '../assets/Bell.png'

export default function NavbarComponent() {
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
   </div>
  )
}




{/* <Row>
        <Col>
        <h3 className="fleetCustomize"> <img src={Logo} alt='Fleet Logo' height='30px' /> Fleet Finder </h3>
        </Col>

        <Col>
        <h6 className='notiCuz'> <img src={Bell} alt='Fleet Logo' height='30px' /> Dashboard <span className='accCuz'> Account </span> </h6>
        </Col>
       </Row> */}

import '../index.css'
import { Row, Col, Navbar, Container, Nav, Button } from 'react-bootstrap'
import Logo from '../assets/fleetlogo.png'
import Bell from '../assets/Bell.png'
import { useNavigate } from 'react-router-dom'

export default function NavbarComponent(): JSX.Element {

  let navigate = useNavigate();

  const handleLinkToDashboard = () => navigate('/DispatchDashboard');
  const handleLinkToAccount = () => navigate('/DispatchAccountPage');

  return (
    <>
      <Navbar className='mainNav' variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Fleet Finder Logo"
              src={Logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <p className='d-inline fs-2'>FleetFinder</p>
          </Navbar.Brand>
          <Row className='justify-content-between align-items-center'>
            <Col className='col-3 d-flex flex-row justify-content-start'>
              <Button className='bg-transparent bellButton d-flex align-items-center'><img src={Bell} alt="Bell Icon" className='bellIcon' /><span className='redCircle'>2</span></Button>
            </Col>
            <Col className='col-3'>
              <Nav.Link className='text-white' onClick={handleLinkToDashboard}>Dashboard</Nav.Link>
            </Col>
            <Col className='col-3'>
              <Nav.Link className='text-white' onClick={handleLinkToAccount}>Account</Nav.Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  //  <div className='brColor'>
  //      <Navbar expand="lg">
  //     <Container >
  //       <h3 className='fleetCustomize'> <img src={Logo} alt='Fleet Logo' height='30px' /> Fleet Finder </h3>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav"/>
  //       <Navbar.Collapse id="basic-navbar-nav">  
  //       <h6 className='dashCuz'> <span className='bellNoti'> <img src={Bell} alt='Fleet Logo' height='25px' /> </span> Dashboard <span className='accCount'> Account </span> </h6> 
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  //  </div>
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

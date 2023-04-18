// import '../index.css'
import '../App.css';
import { Row, Col, Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap'
import Logo from '../assets/fleetlogo.png'
import Bell from '../assets/Bell.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function NavbarComponent(): JSX.Element {

  let navigate = useNavigate();

  const [notifications, setNotifications] = useState<Array<any>>([
    {
      message: 'Napa Yard Updated',
      timestamp: 1615419720,
      submittedBy: 'Pedro Castaneda',
      action: 'updated'
    },
    {
      message: 'Enocore Updated',
      timestamp: 1628161500,
      submittedBy: 'Joaquin Reyes',
      action: 'updated'
    },
    {
      message: 'Cottonwood Yard Removed',
      timestamp: 1637586720,
      submittedBy: 'Shad Skikos',
      action: 'removed'
    },
    {
      message: 'Encore Added',
      timestamp: 1620996600,
      submittedBy: 'Shad Skikos',
      action: 'added'
    }
  ]);

  const DetermineTextColor = (actionType: string) => {
    let textColor: string = '';
    if (actionType === 'updated') {
      textColor = 'text-success';
    } else if (actionType === 'removed') {
      textColor = 'text-danger';
    } else if (actionType === 'added') {
      textColor = 'text-primary';
    }
    return textColor;
  }

  const TimeFormatter = (ut: number): string => {
    let date: any = new Date(ut * 1000);
    let monthShort: string = date.toLocaleDateString('en-US', {month: 'short'});
    let numericDate: string = date.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'});
    console.log(monthShort, numericDate);
    return `${monthShort} ${numericDate}`;
  }

  // TimeFormatter(1648394160);

  const handleLinkToDashboard = () => navigate('/DispatchDashboard');
  const handleLinkToAccount = () => navigate('/DispatchAccountPage');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Can we used user info object to check their account type and used that to setup the condition for displaying the correct offcanvas, account etc?

  // Can I have ourt mortgage company fax them mortgage payment history to medical, what is your fax number 7075652929



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
              <Button
                className='bg-transparent bellButton d-flex align-items-center'
                onClick={handleShow}>
                <img src={Bell} alt="Bell Icon" className='bellIcon' /><span className='redCircle'>2</span>
              </Button>
              <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header>
                  <Button onClick={handleClose} className='bg-transparent border-0'>
                    <i className="bi bi-x-lg"></i>
                  </Button>
                  <Offcanvas.Title className='text-center fs-3 fw-bold'>Notifications</Offcanvas.Title>
                  <Col className='col-1 m-0 p-0'></Col>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Row className='d-flex justify-content-center'>
                    {
                      notifications.map((notification, index) => {
                        console.log(notification.timestamp)
                        return (
                          <>
                            <Col key={index} className='col-10 bg-white rounded mb-3 py-2'>
                              <p className={`fs-5 m-0 ${DetermineTextColor(notification.action)}`}>{notification.message}</p>
                              <p className='text-dark m-0'>{TimeFormatter(notification.timestamp)}/{notification.submittedBy}</p>
                            </Col>
                          </>
                        )
                      })
                    }
                  </Row>
                </Offcanvas.Body>
              </Offcanvas>
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

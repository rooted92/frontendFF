// import '../index.css'
import '../App.css';
import { Row, Col, Navbar, Container, Nav, Button, Offcanvas, NavDropdown } from 'react-bootstrap';
import Logo from '../assets/fleetlogo.png';
import Bell from '../assets/Bell.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  accountType: string | undefined;
}

export default function NavbarComponent({ accountType }: NavbarProps): JSX.Element {

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
    },
    {
      message: 'Napa Yard Updated',
      timestamp: 1615419720,
      submittedBy: 'Pedro Castaneda',
      action: 'updated'
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

  // this function will return a string vvv
  const TimeFormatter = (ut: number): string => {
    let date: any = new Date(ut * 1000);
    let monthShort: string = date.toLocaleDateString('en-US', { month: 'short' });
    let numericDate: string = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    // console.log(monthShort, numericDate);
    return `${monthShort} ${numericDate}`;
  }

  const handleLinkToDashboard = () => {
    if (accountType === 'Dispatcher') {
      navigate('/DispatchDashboard');
    } else if (accountType === 'Driver') {
      navigate('/DriverDashboard');
    } else if (accountType === 'Admin') {
      navigate('/AdminDashboard');
    }
  }
  const handleLinkToAccount = () => {
    navigate('/AccountPage');
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('Token');
    navigate('/');
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Can we used user info object to check their account type and used that to setup the condition for displaying the correct offcanvas, account etc?

  return (
    <>
      <Navbar className='mainNav' collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Fleet Finder Logo"
              src={Logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            <p className='d-inline fs-2'>FleetFinder</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Button
                className='bg-transparent bellButton d-flex align-items-center'
                onClick={handleShow}>
                <img src={Bell} alt="Bell Icon" className='bellIcon' />
                {notifications.length > 0 ? <span className='redCircle'>{notifications.length}</span> : null}
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
                        // console.log(notification.timestamp)
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

              <Nav.Link className='text-white' onClick={handleLinkToDashboard}>Dashboard</Nav.Link>

              <Nav.Link className='text-white' onClick={handleLinkToAccount}>Account</Nav.Link>

              <Nav.Link className='text-white' onClick={handleLogout}>Logout</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
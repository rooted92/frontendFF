import React, {useEffect, useState} from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button } from 'react-bootstrap';
import Logo from '../../assets/fleetlogo.png';
import Bell from '../../assets/Bell.png';
import NavbarComponent from '../NavbarComponent';
import Footer from '../FooterComponent';

export default function DriverDashBoard() {

    const [userInfo, setUserInfo] = useState({
        id: undefined,
        name: undefined,
        email: undefined,
        phoneNumber: undefined,
        organizationID: undefined,
        accountType: undefined,
        isDarkMode: undefined
    });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);


    return (
        <div className='pageContainer'>
            {/* <Navbar expand="lg">
                <Container >
                    <h3 className='fleetCustomize'> <img src={Logo} alt='Fleet Logo' height='30px' /> Fleet Finder </h3>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <h6 className='dashCuz'> <span className='bellNoti'> <img src={Bell} alt='Fleet Logo' height='25px' /> </span> Dashboard <span className='accCount'> Account </span> </h6>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <div className="mainContent">
                <NavbarComponent accountType={userInfo.accountType}/>
                <Container>
                    <Row className='rowCardCuz'>
                        <Col className='cardCuz'>
                            <Card style={{ width: '30rem', height: '25rem' }}>
                                <Card.Body>
                                    <Card.Title className='text-center'> Past Submissions </Card.Title>
                                    <Card.Text>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='cardCuz'>
                            <Button className='buttonColor'> +Submint Trailer Count</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

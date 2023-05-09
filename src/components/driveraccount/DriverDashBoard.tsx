import React, { useEffect, useState } from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button } from 'react-bootstrap';
// import PlusIcon from '../../assets/plus.svg';
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
            <div className="mainContent">
                <NavbarComponent accountType={userInfo.accountType} />
                <Container className='mx-auto mt-5'>
                    <Row className=''>
                        <Col className='col-6'>
                            <Card style={{ width: '30rem', height: '25rem' }}>
                                <Card.Body>
                                    <Card.Title className='text-center'> Past Submissions </Card.Title>
                                    <Card.Text>
                                        {/* Once we have the data, we will add a ternary here to check if submitted trailer count array is greater than 0, if it is show past submissions if not show red text */}
                                        <p className='fs-5 text-danger text-center'>You have no past submissions</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='col-6 d-flex justify-content-center align-self-start'>
                            <Button className='buttonColor w-auto h-5 px-2'>
                                {/* <Row> */}
                                    {/* <img className='' src={PlusIcon} alt="plus icon" /> */}
                                    + Submint Trailer Count
                                {/* </Row> */}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button } from 'react-bootstrap';
// import PlusIcon from '../../assets/plus.svg';
import NavbarComponent from '../NavbarComponent';
import Footer from '../FooterComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import WelcomeMessage from '../WelcomeMsgComponent';

export default function DriverDashBoard() {

    let navigate = useNavigate();
    const location = useLocation();

    // Temporary boolean to display welcome message
    // Eventaully will use array from GetUpdatesFromUser 
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

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

    const handleSubmitTrailerCount = () => {
        navigate('/SubmitTrailerCount');
    }

    return (
        <div className='pageContainer'>
            <div className="mainContent">
                <NavbarComponent accountType={userInfo.accountType} />
                {
                    isUpdated 
                    ?
                    <div className=''>
                        <WelcomeMessage checkURL={location.pathname} />
                    </div>
                    :
                    <p>Hi</p>
                }

                <Container className='my-5'>
                    <Row className='justify-content-around'>
                        <Col className='col-4'>
                            <Card style={{ width: '25rem', height: '28rem' }}>
                                <Card.Body>
                                    <Card.Title className='text-center'> Past Submissions </Card.Title>
                                    <Card.Text>
                                        {/* Once we have the data, we will add a ternary here to check if submitted trailer count array is greater than 0, if it is show past submissions if not show red text */}
                                        <p className='fs-5 text-danger text-center'>You have no past submissions</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='col-4 d-flex justify-content-center align-self-start'>
                            <Button onClick={handleSubmitTrailerCount} className='buttonColor w-auto h-5 px-2'>
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

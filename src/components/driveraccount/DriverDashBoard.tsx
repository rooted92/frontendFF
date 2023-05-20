import React, { useEffect, useState } from 'react'
import '../../index.css'
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
// import PlusIcon from '../../assets/plus.svg';
import NavbarComponent from '../NavbarComponent';
import Footer from '../FooterComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import WelcomeMessage from '../WelcomeMsgComponent';
import PastSubmissionComponent from './PastSubmissionComponent';
import { GetTrailerCountSubmissions } from '../../services/DataService';

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
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

    // This will fetch all previous trailer count submissions user has made.
    useEffect(() => {
        const FetchSubmissionsData = async () => {
            let updates = await GetTrailerCountSubmissions(userInfo.id);
            console.log(updates);
        }
        FetchSubmissionsData();
    }, [userInfo]);

    const handleSubmitTrailerCount = () => {
        navigate('/SubmitTrailerCount');
    }

    return (
        <div className='pageContainer'>
            <div className="mainContent">
                <NavbarComponent accountType={userInfo.accountType} />
                {
                    // sample of how welcome message will work
                    isUpdated
                        ?
                        <>
                            <Row className='justify-content-end'>
                                <Col className='col-3'>
                                    <Button onClick={() => {
                                        handleSubmitTrailerCount()
                                    }} className='buttonColor mt-4 w-auto h-5 px-2'>
                                        {/* <Row> */}
                                        {/* <img className='' src={PlusIcon} alt="plus icon" /> */}
                                        + Submint Trailer Count
                                        {/* </Row> */}
                                    </Button>
                                </Col>
                            </Row>

                            <div className='mt-5'>
                                <WelcomeMessage checkURL={location.pathname} />
                            </div>
                        </>
                        :
                        null
                }

                <Container className='my-5'>
                    <Row className='justify-content-around'>
                        {/* <Col className='col-4'>
                            <Card style={{ width: '25rem', height: '28rem' }}>
                                <Card.Body className='overflow-scroll'> */}
                                    {
                                        // we will add a ternary to check if array of past submissions is greater than 0 to show 'You have no past submissions text'
                                    }
                                    {/* <Card.Title className='text-center'> Past Submissions </Card.Title>
                                    <Card.Text> */}
                                        {/* Once we have the data, we will add a ternary here to check if submitted trailer count array is greater than 0, if it is show past submissions if not show red text */}
                                        {/* <p className='fs-5 text-danger text-center'>You have no past submissions</p> */}
                                    {/* </Card.Text>
                                    <Row className='justify-content-center'>
                                        <Col className='col-10 px-3 my-2 mx-4 py-2 rounded pastSubmission align-self-start'>
                                            <PastSubmissionComponent
                                                yardName='Napa yard'
                                                timeStamp='Jan 8, 2023 12:45PM' />
                                        </Col>
                               
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col> */}
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

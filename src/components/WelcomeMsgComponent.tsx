// NOTE*** Throw this component into account dashboards (dispatch/driver/admin) depending on witch account is logged in it will display the appropriate message.

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// using interface to make props object
interface WelcomeProps {
    checkURL: string;
}
// destructuing object to get checkURL
const WelcomeMessage = ({ checkURL }: WelcomeProps): JSX.Element => {

    const [userName, setUserName] = useState('TestName');
    const [isNextClicked, setIsNextClicked] = useState(false);
    // console.log(props.checkURL)

    // setUserName('Pedro');

    const urlCheckerObject = {
        dispatch: '/DispatchDashboard',
        driver: '/DriverDashboard',
        admin: '/AdminDashboard'
    }

    // console.log(urlCheckerObject.dispatch)
    const handleNext = () => {
        // console.log(isNextClicked);
        setIsNextClicked(!isNextClicked);
        // console.log(isNextClicked);
    }

    // This function will check which url the user is in. This will essentially determine which account is logged in by using the url path if its '/DispatchDashboard' then the welcome message for dispatch account will display else one of the other two
    const renderMessage = () => {
        if (checkURL === urlCheckerObject.admin) {
            return (
                // {
                !isNextClicked ?
                    <Container>
                        <Row className='d-flex justify-content-center'>
                            <Col className='col-7 d-flex flex-column align-items-center'>
                                <h1 className='text-center fw-bold'>Welcome {userName}!</h1>
                                <p className='text-center fs-1'>To get started follow the steps below:</p>
                                <ol>
                                    <li>Copy the organization code above and send it to your dispatch team and drivers so they can get setup their account. For security measures a new organization code will be generated every 24 hours. You can check your account for an updated security code when adding new team members.</li>
                                </ol>
                                <Button className='darkBlueBG btn' type='button' onClick={handleNext}>Next</Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Container>
                        <Row className='d-flex justify-content-center'>
                            <Col className='col-7'>
                                <h1 className='text-center fw-bold'>Welcome {userName}!</h1>
                                <p className='text-center fs-1'>To get started follow the steps below:</p>
                                <ol className='blueText'>
                                    <li>Start by clicking on the 'Add Location' button, which is located in the top right corner of your dashboard.</li>
                                    <li>Once you click on the button, you'll be directed to a form. Fill out the required information in the form to add a new yard location to your dashboard.</li>
                                    <li>Once you have completed the form, click on the 'Submit' button.</li>
                                    <li>After submitting the form, your new location will be added to your dashboard.</li>
                                </ol>
                            </Col>
                        </Row>
                    </Container>
                // }
            )
        } else if (checkURL === urlCheckerObject.driver) {
            return (
                <>
                    <Container>
                        <Row className='d-flex justify-content-center'>
                            <Col className='col-12 col-md-7'>
                                <h1 className='text-center fw-bold'>Welcome {userName}!</h1>
                                <p className='text-center fs-1'>To get started follow the steps below:</p>
                                <ol className='blueText'>
                                    <li>Click on the ‘Submit Trailer Count’ button above.</li>
                                    <li>Then fill out the Trailer Count Form and click ‘Finished’ when done.</li>
                                    <li>Woohoo! You’ve submitted your first form!</li>
                                </ol>
                                <p>To view your notifications click on the bell icon in the Navigation Menu. Here you will see Trailer Count Requests sent by your dispatch team.</p>
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        } else if (checkURL === urlCheckerObject.dispatch) {
            return (
                <>
                    <Container>
                        <Row className='d-flex justify-content-center'>
                            <Col className='col-7'>
                                <h1 className='text-center fw-bold'>Welcome {userName}!</h1>
                                <p className='text-center fs-1'>To get started follow the steps below:</p>
                                <ol className='blueText'>
                                    <li>Start by clicking on the 'Add Location' button, which is located in the top right corner of your dashboard.</li>
                                    <li>Once you click on the button, you'll be directed to a form. Fill out the required information in the form to add a new yard location to your dashboard.</li>
                                    <li>Once you have completed the form, click on the 'Submit' button.</li>
                                    <li>After submitting the form, your new location will be added to your dashboard.</li>
                                </ol>
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        } else {
            return (
                <>
                    <h1>NO MATCH</h1>
                </>
            )
        }
    }


    return (
        <>
            <div>
                {renderMessage()}
            </div>
        </>
    );
}

export default WelcomeMessage;
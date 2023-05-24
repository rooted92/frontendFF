import React, { useEffect, useState } from 'react'
import '../index.css'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Logo from '../assets/fleetlogo.png'
import { useNavigate, useParams } from 'react-router-dom'
import { createQualifiedName } from 'typescript'

export default function SignUpConfirmation() {
    const { joinCode, type } = useParams();

    let navigate = useNavigate();
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
            console.log(userInfo);
            setUserInfo(userInfo);
        }
    }, []);

    const handleReturnToSignIn = () => {
        navigate('/');
    }

    return (
        <Container>
            <Row>
                <Col className='d-flex justify-content-center signCuz'>
                    <img src={Logo} alt='Fleet Logo' height='150px' />
                </Col>
            </Row>

            <Container>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <h1 className='pt-3 wellCuz'>Fleet Finder</h1>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <h5 className='text-center suCuz pt-5'>Thanks for signing up!</h5>
                        {type === 'Admin' ?
                            <>
                                <p className='text-center suCuz'>Join Code: {joinCode}</p>
                                <p className='text-center suCuz text-danger'>Please have your employees use this join code to register their account under you organization.</p>
                            </>
                            : null
                        }

                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col className=' text-center pt-3'>
                        <Button
                            className='siButton text-center'
                            onClick={handleReturnToSignIn}>Sign In</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

import { useState, useEffect } from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button, Form } from 'react-bootstrap'
import Logo from '../../assets/fleetlogo.png'
import Bell from '../../assets/Bell.png'
import NavbarComponent from '../NavbarComponent'
import { useNavigate } from 'react-router-dom'
import Footer from '../FooterComponent'

export default function ThankYouForSubmission() {

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
            setUserInfo(userInfo);
        }
    }, []);

    const handleViewDashboard = () => {
        navigate('/DriverDashboard')
    }

    return (
        <div className='pageContainer'>
            <div className="mainContent">
                <NavbarComponent accountType={userInfo.accountType} />
                <Container className='mx-auto'>
                    <Row className='justify-content-center'>
                        <Col className='col-4 pt-5 text-center'>
                            <p className='fw-bold fs-4'>Thank you for your submission!</p>
                            <Button onClick={handleViewDashboard} className='buttonColor'>View DashBoard</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

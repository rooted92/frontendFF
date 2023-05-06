import {useState, useEffect} from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button, Form } from 'react-bootstrap'
import Logo from '../../assets/fleetlogo.png'
import Bell from '../../assets/Bell.png'
import NavbarComponent from '../NavbarComponent'

export default function ThankYouForSubmission() {

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
        <div>
            <NavbarComponent accountType={userInfo.accountType} />

            <Container>
                <Row>
                    <Col>
                        <h4 className='text-center tfysCuz'>Thanks for your submission!</h4>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col className='d-flex justify-content-center pt-4'>
                        <Button className='buttonColor'>View DashBoard</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

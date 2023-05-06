import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../FooterComponent";
import NavbarComponent from "../NavbarComponent";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ConfirmationMessage = () => {

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

    let navigate = useNavigate();

    const handleReturn = () => {
        // checking which type of account is logged to route to correct page
       if(userInfo.accountType === 'Dispatcher') navigate('/DispatchDashboard');
       else navigate('/AdminDashboard');
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Container className="mt-5">
                        <Row className="justify-content-center">
                            <Col className="col-4 d-flex flex-column align-items-center">
                                <h2 className="fw-bold ">Location Added!</h2>
                                <Button
                                    className="btn darkBlueBG"
                                    onClick={handleReturn}>View Dashboard</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ConfirmationMessage;
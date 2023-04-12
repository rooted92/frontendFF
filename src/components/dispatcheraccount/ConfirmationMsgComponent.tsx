import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../FooterComponent";
import NavbarComponent from "../NavbarComponent";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationMessage = () => {

    let navigate = useNavigate();
    const location: object = useLocation();

    const handleReturn = () => {
        navigate('/DispatchDashboard');
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent />
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
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Form, Button, Card, Accordion } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import WelcomeMessage from "../WelcomeMsgComponent";
import { useState, useEffect } from "react";
import { GetAllYards } from "../../services/DataService";

const AdminDashboard = (): JSX.Element => {

    const location = useLocation();

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

    const [yardLocations, setYardLocations] = useState<Array<any>>([
        {
            ID: null,
            Name: null,
            Address: null,
            City: null,
            State: null,
            Zipcode: null,
            OrganizationID: null,
            IsDeleted: null
        }
    ]);

    useEffect(() => {
        const fetchYardData = async () => {
            setYardLocations(await GetAllYards());
        }
        fetchYardData();
        console.log(yardLocations);
    }, [])

    let navigate = useNavigate();

    const handleRequest = () => {
        navigate('/TrailerCountRequestForm');
    }

    const handleAddLocation = () => {
        console.log(userInfo);
        navigate('/AddLocationForm');
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Container className="mt-5">
                        <Row className="d-flex justify-content-between mb-3">
                            <Col className="col-4">
                                <p className="fs-3">Yard Locations</p>
                            </Col>
                            <Col className="col-4 d-flex justify-content-end align-self-start">
                                <Button className="mx-2 lightBlueBG" onClick={handleRequest}>Request Trailer Count</Button>
                                <Button className="darkBlueBG" onClick={handleAddLocation}>Add Location</Button>
                            </Col>
                        </Row>

                        {
                            yardLocations.length === 0
                                ? <WelcomeMessage checkURL={location.pathname} />

                                :
                                <>
                                    <Row>
                                        <Col className="col-12">
                                            <Accordion defaultActiveKey="1">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>In Transit</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row className="d-flex justify-content-start">
                                                            {/* Here we will map though in transit array and create col-4 for each trailer in transit
                                                {
                                                    trailersInTransit.map((trailer, index) => {
                                                        if (trailer.inTransit) {
                                                            return (
                                                                <Col key={index} className="col-4 mb-3 align-self-center">
                                                                    <div className="trailerInTransit rounded d-flex justify-content-around">
                                                                        <p className="m-0 p-2">{trailer.TrailerNumber} In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                                    </div>
                                                                </Col>
                                                            )
                                                        }
                                                    })
                                                } */}
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Col>
                                    </Row>
                                    <Row className="my-5 d-flex justify-content-center">
                                        {
                                            yardLocations.map(yard => {
                                                return (
                                                    < Col key={yard.ID} className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex flex-column align-items-center" >
                                                        <Card>
                                                            <Card.Body>
                                                                <Card.Title>{yard.name}</Card.Title>
                                                                <Card.Text>
                                                                    <Row className="d-flex justify-content-around">
                                                                        <Col className="col-4 text-nowrap">
                                                                            <p>Empty: 12</p>
                                                                            <p>Loaded: 8</p>
                                                                            <p>Clean: 4</p>
                                                                            <p>Dirty: 1</p>
                                                                        </Col>
                                                                        <Col className="col-4 text-nowrap">
                                                                            <p>Dry Vans: 10</p>
                                                                            <p>Reefers: 4</p>
                                                                            <p>Tankers: 6</p>
                                                                            <p>Total: 20</p>
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                                <Row className="d-flex justify-content-center">
                                                                    <Col className="col-6">
                                                                        <Button className="darkBlueBG">View Details</Button>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <p className="m-0 mt-4 text-center">Last updated on: Feb 24, 2023 9:36AM</p>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>

                                </>
                        }


                    </Container>


                </div>
                <Footer />
            </div >
        </>
    )
}

export default AdminDashboard;


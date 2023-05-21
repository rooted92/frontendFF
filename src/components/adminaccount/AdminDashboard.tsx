import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Button, Card, Accordion, Offcanvas } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import WelcomeMessage from "../WelcomeMsgComponent";
import { useState, useEffect } from "react";
import { GetAllYards, GetAllTrailers } from "../../services/DataService";

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
    const [show, setShow] = useState<boolean>(false);

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

    type trailerType =
        {
            cleanliness: string,
            details: string,
            fuelLevel: string,
            id: number,
            inTransit: boolean,
            isDeleted: boolean,
            length: string,
            load: string,
            organizationID: number,
            possessionID: number,
            trailerNumber: string,
            type: string
        };

    const [allTrailers, setAllTrailers] = useState<Array<trailerType>>([]);

    useEffect(() => {
        const fetchYardData = async () => {
            setYardLocations(await GetAllYards(userInfo.organizationID));
        }
        const fetchTrailerData = async () => {
            setAllTrailers(await GetAllTrailers(userInfo.organizationID));
        }
        if (userInfo.organizationID != undefined) {
            fetchYardData();
            fetchTrailerData();
        }
        console.log(yardLocations);
        console.log(allTrailers);
    }, [userInfo]);

    let navigate = useNavigate();

    const handleRequest = () => {
        navigate('/TrailerCountRequestForm');
    }

    const handleAddLocation = () => {
        console.log(userInfo);
        navigate('/AddLocationForm');
    }

    const handleShowTeam = () => {
        setShow(true);
    }
    const handleCloseTeam = () => {
        setShow(false);
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Offcanvas show={show} onHide={handleCloseTeam}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="text-center fw-bold">Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Some text as placeholder. In real life you can have the elements you
                            have chosen. Like, text, images, lists, etc.
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Container className="mt-5">
                        <Row className="d-flex justify-content-between mb-3">
                            <Col className="col-6">
                                <p className="fs-3">Yard Locations</p>
                            </Col>
                            <Col className="col-6 d-flex justify-content-end align-self-start">
                                <Button className="mx-2 lightBlueBG" onClick={handleRequest}>Request Trailer Count</Button>
                                <Button className="darkBlueBG" onClick={handleAddLocation}>Add Location</Button>
                                <Button className="darkBlueBG mx-2" onClick={handleShowTeam} >Manage Team</Button>
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
                                    <Row className="my-5">
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


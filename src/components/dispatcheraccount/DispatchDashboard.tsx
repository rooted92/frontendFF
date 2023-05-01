import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import WelcomeMessage from "../WelcomeMsgComponent";
import NavbarComponent from "../NavbarComponent";
import { Button, Col, Container, Row, Accordion, Card, Navbar } from "react-bootstrap";

// Create a models folder and import from there trailer, driver, etc. models

const DispatchDashboard = (): JSX.Element => {

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

    // Seed data for yard locations
    const [yardLocations, setYardLocations] = useState<Array<any>>([
        {
            ID: 1,
            Name: 'Napa Yard',
            Address: '123 Main St',
            City: 'Napa',
            State: 'CA',
            Zipcode: 95402,
            OrganizationID: 1,
            IsDeleted: false
        },
        {
            ID: 2,
            Name: 'PPP Yard',
            Address: '123 Main St',
            City: 'Petaluma',
            State: 'CA',
            Zipcode: 95402,
            OrganizationID: 1,
            IsDeleted: false
        },
        {
            ID: 3,
            Name: 'Cottonwood Yard',
            Address: '123 Main St',
            City: 'Cottonwood',
            State: 'CA',
            Zipcode: 95402,
            OrganizationID: 1,
            IsDeleted: false
        },
        {
            ID: 4,
            Name: 'Owens Yard',
            Address: '123 Main St',
            City: 'Fairfield',
            State: 'CA',
            Zipcode: 95402,
            OrganizationID: 1,
            IsDeleted: false
        },
        {
            ID: 5,
            Name: 'Encore',
            Address: '123 Main St',
            City: 'Fairfield',
            State: 'CA',
            Zipcode: 95402,
            OrganizationID: 1,
            IsDeleted: false
        },
        {
            ID: 6,
            Name: 'U.S. Cold McClellan',
            Address: '123 Main St',
            City: 'Sacramento',
            State: 'CA',
            Zipcode: 95402,
            OrganizationID: 1,
            IsDeleted: false
        }
    ]);

    const [trailersInTransit, setTrailersInTransit] = useState<Array<any>>([
        {
            TrailerNumber: 316,
            inTransit: true
        },
        {
            TrailerNumber: 5004,
            inTransit: true
        },
        {
            TrailerNumber: 314,
            inTransit: false
        },
        {
            TrailerNumber: 4806,
            inTransit: true
        },
        {
            TrailerNumber: 5310,
            inTransit: true
        },
        {
            TrailerNumber: 76,
            inTransit: true
        },
        {
            TrailerNumber: 701,
            inTransit: true
        }
    ]);

    // useLocation grabs the current pathname
    const location = useLocation();
    // console.log(typeof location.pathname);

    let navigate = useNavigate();

    const handleRequest = () => {
        navigate('/TrailerCountRequestForm');
    }

    const handleAddLocation = () => {
        console.log(userInfo);
        navigate('/AddLocationForm');
    }

    // const [truckNumber, setTruckNumber] = useState<number>(0);
    // const [routeName, setRouteName] = useState<string>('');

    return (
        <>
            {/* Template for Dispatch Dashboard (also template for how pages will be structured out to avoid issues with footer not staying in place) */}
            <div className="pageContainer">
                <div className="mainContent">
                    {/* import navbar here */}

                    <NavbarComponent />
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
                                                            {/* Here we will map though in transit array and create col-4 for each trailer in transit */}
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
                                                            }
                                                            {/* <Col className="col-4 mb-3 align-self-center">
                                                                <div className="trailerInTransit rounded d-flex justify-content-around">
                                                                    <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                                </div>
                                                            </Col>
                                                            <Col className="col-4 mb-3 align-self-center">
                                                                <div className="trailerInTransit rounded d-flex justify-content-around">
                                                                    <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                                </div>
                                                            </Col>
                                                            <Col className="col-4 mb-3 align-self-center">
                                                                <div className="trailerInTransit rounded d-flex justify-content-around">
                                                                    <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                                </div>
                                                            </Col>
                                                            <Col className="col-4 mb-3 align-self-center">
                                                                <div className="trailerInTransit rounded d-flex justify-content-around">
                                                                    <p className="m-0 p-2">316 In Transit </p><span className="blueText m-0 p-2">Assigned To - Pedro C</span>
                                                                </div>
                                                            </Col> */}
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Col>
                                    </Row>
                                    <Row className="my-5 d-flex justify-content-center">
                                        {/* here we will map through the yard locations array and create col-3 divs for each card. */}
                                        {
                                            yardLocations.map(yard => {
                                                return (
                                                    < Col key={yard.ID} className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex flex-column align-items-center" >
                                                        <Card>
                                                            <Card.Body>
                                                                <Card.Title>{yard.Name}</Card.Title>
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

                        {/* Accordion to view trailers currently in transit */}

                    </Container>

                    {/* <WelcomeMessage checkURL={location.pathname} /> */}
                </div>
                <Footer />
            </div >
        </>
    )
}

export default DispatchDashboard;
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import WelcomeMessage from "../WelcomeMsgComponent";
import NavbarComponent from "../NavbarComponent";
import { Button, Col, Container, Row, Accordion, Card, Navbar } from "react-bootstrap";
import { GetAllTrailers, GetAllYards, GetLastYardUpdate } from "../../services/DataService";

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

    const [yardLocations, setYardLocations] = useState<Array<any>>([
        {
            address: null,
            city: null,
            id: null,
            isDeleted: null,
            name: null,
            organizationID: null,
            state: null,
            zipcode: null
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
    }

    const [allTrailers, setAllTrailers] = useState<Array<trailerType>>([]);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

    useEffect(() => {
        const fetchYardData = async () => {
            setYardLocations(await GetAllYards(userInfo.organizationID));
        }
        const fetchTrailerData = async () => {
            setAllTrailers(await GetAllTrailers(userInfo.organizationID));
        }
        if(userInfo.organizationID != undefined) {
            fetchYardData();
            fetchTrailerData();
        }
        // console.log(yardLocations);
        // console.log(allTrailers);
    }, [userInfo])

    // useEffect(() => {
    //     const fetchTrailerData = async () => {
    //         setAllTrailers(await GetAllTrailers());
    //     }
    //     fetchTrailerData();
    //     console.log(allTrailers);
    // }, []);


    // const [trailersInTransit, setTrailersInTransit] = useState<Array<any>>([
    //     {
    //         TrailerNumber: 316,
    //         inTransit: true
    //     }
    // ]);

    // useLocation grabs the current pathname
    const location = useLocation();
    // console.log(typeof location.pathname);

    let navigate = useNavigate();

    const handleRequest = () => {
        navigate('/TrailerCountRequestForm');
    }

    const handleAddLocation = () => {
        // console.log(userInfo);
        navigate('/AddLocationForm');
    }

    const handleViewDetails = (yardId: any, yardName: any) => {
        // console.log(yardId);
        navigate(`/YardDetails/${yardId}/${yardName}`);
    }

    return (
        <>
            {/* Template for Dispatch Dashboard (also template for how pages will be structured out to avoid issues with footer not staying in place) */}
            <div className="pageContainer">
                <div className="mainContent">
                    {/* import navbar here */}

                    <NavbarComponent accountType={userInfo.accountType} />
                    <Container className="mt-5">
                        <Row className="d-flex justify-content-between mb-3">
                            <Col className="col-12 col-md-6">
                                <p className="fs-3 text-center text-md-start">Yard Locations</p>
                            </Col>
                            <Col className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-self-start">
                                <Button className="mx-2 lightBlueBG" onClick={handleRequest}>Request Trailer Count</Button>
                                <Button className="darkBlueBG" onClick={handleAddLocation}>Add Location</Button>
                            </Col>
                        </Row>

                        {
                            yardLocations.length === 0
                                ?
                                <WelcomeMessage checkURL={location.pathname} />
                                :
                                <>
                                    <Row className="justify-content-center">
                                        <Col className="col-9 col-md-12">
                                            <Accordion defaultActiveKey="1">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>In Transit</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row className="d-flex justify-content-start">
                                                        {
                                                                allTrailers.map(trailer => {
                                                                    if(trailer.inTransit) {
                                                                        return (
                                                                            <Col key={trailer.id} className="col-4 mb-3 align-self-center">
                                                                                <div className="trailerInTransit rounded d-flex justify-content-around">
                                                                                    <p className="m-0 p-2">{trailer.trailerNumber} In Transit </p><span className="blueText m-0 p-2">Assigned To - {trailer.possessionID}</span>
                                                                                </div>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                })
                                                            }
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
                                    <Row className="my-5 d-flex">
                                        {/* here we will map through the yard locations array and create col-3 divs for each card. */}
                                        {
                                            yardLocations.map(yard => {
                                                // let yardUpdate = GetLastYardUpdate(yard.id);
                                                // console.log(yard.id)
                                                let empty = 0;
                                                let loaded = 0;
                                                let clean = 0;
                                                let dirty = 0;
                                                let dryVans = 0;
                                                let reefers = 0;
                                                let tankers = 0;
                                                let total = 0;
                                                allTrailers.map(trailer => {
                                                    // console.log(!trailer.inTransit && trailer.possessionID == yard.id);
                                                    if(!trailer.inTransit && trailer.possessionID === yard.id)
                                                    {
                                                        if(trailer.load === "Empty") {
                                                            empty++;
                                                        } else if(trailer.load === "Loaded") {
                                                            loaded++;
                                                        }
                                                        if(trailer.cleanliness == "Clean") {
                                                            clean++;
                                                        } else if(trailer.cleanliness == "Dirty"){
                                                            dirty++;
                                                        }
                                                        if(trailer.type === "Dry Van") {
                                                            dryVans++;
                                                        } else if(trailer.type === "Reefer") {
                                                            reefers++;
                                                        } else if(trailer.type == "Tanker") {
                                                            tankers++;
                                                        } 
                                                        total++;
                                                    }
                                                });
                                                return (
                                                    < Col key={yard.id} className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex flex-column align-items-center">
                                                        <Card>
                                                            <Card.Body>
                                                                <Card.Title className="text-truncate">{yard.name}</Card.Title>
                                                                <Card.Text>
                                                                    <Row className="d-flex justify-content-around">
                                                                        <Col className="col-4 text-nowrap">
                                                                            <p>Empty: {empty}</p>
                                                                            <p>Loaded: {loaded}</p>
                                                                            <p>Clean: {clean}</p>
                                                                            <p>Dirty: {dirty}</p>
                                                                        </Col>
                                                                        <Col className="col-4 text-nowrap">
                                                                            <p>Dry Vans: {dryVans}</p>
                                                                            <p>Reefers: {reefers}</p>
                                                                            <p>Tankers: {tankers}</p>
                                                                            <p>Total: {total}</p>
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                                <Row className="d-flex justify-content-center">
                                                                    <Col className="col-6">
                                                                        <Button onClick={() => handleViewDetails(yard.id, yard.name)} className="darkBlueBG">View Details</Button>
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
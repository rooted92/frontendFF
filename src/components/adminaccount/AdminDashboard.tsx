import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Button, Card, Accordion, Offcanvas, Modal } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import WelcomeMessage from "../WelcomeMsgComponent";
import DeleteIcon from '../../assets/delete.svg'
import { useState, useEffect } from "react";
import { GetAllYards, GetAllTrailers, GetUserByOrganization, FormatName, DeleteUser } from "../../services/DataService";

const AdminDashboard = (): JSX.Element => {

    const location = useLocation();

    // check signin component to see what userInfo is returning for admin account! You may find the answer there
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
    const [team, setTeam] = useState<any[]>([]);
    const [isUserDeleted, setIsUserDeleted] = useState<boolean>(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

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
        };

    const [allTrailers, setAllTrailers] = useState<Array<trailerType>>([]);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
        //userInfo is undefined... check that admin info is the same as driver/dispatch info.. this may be causing the issue
        // console.log(userInfo);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

    useEffect(() => {
        // console.log(userInfo.organizationID)
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
        // console.log(yardLocations);
        // console.log(allTrailers);
        const fetchTeam = async () => {
            let teamData = await GetUserByOrganization(userInfo.organizationID);
            // console.log(teamData);
            let teamArray = teamData.filter((member: any) => {
                // console.log('MEMBER ARRAY')
                // console.log(member);
                if (member.accountType === 'Dispatcher' || member.accountType === 'Driver') {
                    // console.log(member.name);
                    let memberObject = {
                        id: member.id,
                        name: member.name
                    }
                    // console.log('Here is member OBJECT')
                    // console.log(memberObject);
                    return memberObject;
                }
            }).map((member: any) => {
                // find way to return object of user with name and id
                // console.log('HERE IS MEMBER IN MAP');
                return member;
            });
            // console.log(teamArray);
            setTeam(teamArray);
            // console.log(team);
        }
        fetchTeam();
    }, [userInfo, isUserDeleted]);

    let navigate = useNavigate();

    const handleRequest = () => {
        navigate('/TrailerCountRequestForm');
    }

    const handleAddLocation = () => {
        // console.log(userInfo);
        navigate('/AddLocationForm');
    }

    const handleShowTeam = () => {
        setShow(true);
    }
    const handleCloseTeam = () => {
        setShow(false);
    }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setShowDelete(false)
    }

    const handleViewDetails = (yardId: any, yardName: any) => {
        // console.log(yardId);
        navigate(`/YardDetails/${yardId}/${yardName}`);
    }

    const handleDeleteMember = async (memberId: number) => {
        setIsUserDeleted(false);
        console.log('member deleted')
        const deletedUser = await DeleteUser(memberId);
        // console.log(deletedUser);
        setShowDelete(true);
        //If statement for delete
        if (deletedUser == true) {
            // navigate('/AdminDashboard');
            setIsUserDeleted(true);
        }else{
            console.log('Unable to delete Account');
        }
        console.log("Account Deleted");
        setShowDelete(false);
        setShow(false);
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Offcanvas show={show} onHide={handleCloseTeam}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="text-center fw-bold">Manage Team</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {
                                team.length === 0 ?
                                    <p className="text-danger text-center fw-bold">Invite team members.</p>
                                    :
                                    team.map((member: any) => {
                                        // console.log(member.id)
                                        return (
                                            <>
                                                <Row className="justify-content-center my-2">
                                                    <Col key={member.id} className="col-10 d-flex flex-row justify-content-between px-4 py-3 bg-white rounded text-dark fw-bold fs-5">
                                                        <p className="m-0 pt-1">{FormatName(member.name)}</p>
                                                        <button onClick={handleShowDelete} className='btn btn-transparent' >
                                                            <img src={DeleteIcon} height={'25px'} width={'auto'} alt="delete icon" />
                                                        </button>
                                                        <Modal show={showDelete} onHide={handleCloseDelete}>
                                                            <Modal.Header closeButton></Modal.Header>
                                                            <Modal.Body>
                                                                Are you sure you want to delete account?
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button
                                                                    className="btn-danger"
                                                                    onClick={() => handleDeleteMember(member.id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button className="lightBlueBG" onClick={handleCloseDelete}>
                                                                    Cancel
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    })
                            }

                        </Offcanvas.Body>
                    </Offcanvas>
                    <Container className="mt-5">
                        <Row className="d-flex justify-content-between mb-3">
                            <Col className="col-12 col-md-4">
                                <p className="fs-3 text-center text-md-start">Yard Locations</p>
                            </Col>
                            <Col className="col-12 flex-wrap flex-md-nowrap col-md-8 d-flex justify-content-center justify-content-md-end align-self-start">
                                <Button className="mx-2 lightBlueBG" onClick={handleRequest}>Request Trailer Count</Button>
                                <Button className="darkBlueBG" onClick={handleAddLocation}>Add Location</Button>
                                <Button className="darkBlueBG mx-2 mt-3 mt-md-0" onClick={handleShowTeam} >Manage Team</Button>
                            </Col>
                        </Row>
                        {
                            yardLocations.length === 0
                                ? <WelcomeMessage checkURL={location.pathname} />
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
                                                                    if (trailer.inTransit) {
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
                                    <Row className="my-5">
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
                                                    if (!trailer.inTransit && trailer.possessionID === yard.id) {
                                                        if (trailer.load === "Empty") {
                                                            empty++;
                                                        } else if (trailer.load === "Loaded") {
                                                            loaded++;
                                                        }
                                                        if (trailer.cleanliness == "Clean") {
                                                            clean++;
                                                        } else if (trailer.cleanliness == "Dirty") {
                                                            dirty++;
                                                        }
                                                        if (trailer.type === "Dry Van") {
                                                            dryVans++;
                                                        } else if (trailer.type === "Reefer") {
                                                            reefers++;
                                                        } else if (trailer.type == "Tanker") {
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


                    </Container>


                </div>
                <Footer />
            </div >
        </>
    )
}

export default AdminDashboard;


import { useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Form, Button, Card, Accordion } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import { useState, useEffect } from "react";

const AdminDashboard = (): JSX.Element => {

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

                            <Row className="my-5 d-flex justify-content-center">
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

                        }


                    </Container>


                </div>
                <Footer />
            </div >
        </>
    )
}

export default AdminDashboard;


import { useState, useEffect } from "react";
import { Container, Row, Col, Popover, OverlayTrigger, Button, Table } from 'react-bootstrap';
import Footer from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";
import { GetTrailersByYardID } from "../services/DataService";

const TableComponent = (): JSX.Element => {

    // are we missing an endpoint to get yard by yard id?
    const { id, yardName } = useParams();
    const [trailerArray, setTrailerArray] = useState<any[]>([]);
    const [name, setName] = useState<any>('');

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

    useEffect(() => {
        const FetchTrailerDataForTable = async () => {
            let trailerData = await GetTrailersByYardID(id);
            console.log(trailerData);
            setTrailerArray(trailerData);
            console.log([...trailerArray, trailerData[0]]);
            setName(yardName);
        }
        FetchTrailerDataForTable();
    }, []);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Driver Info</Popover.Header>
            <Popover.Body>
                <p>need driver phone</p>
                <p>need driver email</p>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Container>
                        <Row>
                            <Col className="col-12">
                                <p className="fs-2">{name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-6">
                                <p className="align-self-center m-0">Last updated on : Feb 24, 2023 9:36AM</p>
                            </Col>
                            <Col className="col-6 d-flex justify-content-end">
                                <p className="d-inline m-0 align-self-center">Updated by: Pedro Castaneda</p>
                                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                                    <Button className="btn btn-link bg-transparent text-decoration-none m-0 py-0 d-inline">driver info</Button>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table className="rounded rouded-2" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Trailer#</th>
                                            <th>Type</th>
                                            <th>Empty/Loaded</th>
                                            <th>Clean/Dirty</th>
                                            <th>Fuel Level</th>
                                            <th>Length</th>
                                            <th>Additional Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            trailerArray.map((trailer: any, idx: number) => {
                                                return (
                                                    <>
                                                        <tr key={idx}>
                                                            <td>{trailer.trailerNumber}</td>
                                                            <td>{trailer.type}</td>
                                                            <td>{trailer.load}</td>
                                                            <td>{trailer.cleanliness}</td>
                                                            <td>{trailer.fuelLevel}</td>
                                                            <td>{trailer.length}</td>
                                                            <td>{trailer.details}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }

                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default TableComponent;
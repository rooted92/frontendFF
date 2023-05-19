import { useState, useEffect } from "react";
import { Container, Row, Col, Popover, OverlayTrigger, Button, Table } from 'react-bootstrap';
import Footer from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";
import { GetLastYardUpdate, GetTrailersByYardID, GetUserByID } from "../services/DataService";

const TableComponent = (): JSX.Element => {

    // how can we clear the previouse array/trailercount and bring in the new trailercount so that the array isn't pushed in twice
    const { id, yardName } = useParams();
    const [trailerArray, setTrailerArray] = useState<any[]>([]);
    const [name, setName] = useState<any>('');
    const [lastYardUpdate, setLastYardUpdate] = useState({
        id: undefined,
        yardID: undefined,
        userID: undefined,
        organizationID: undefined,
        dateUpdated: undefined,
        details: undefined
    });
    const [lastUpdateUser, setLastUpdateUser] = useState({
        id: undefined,
        name: undefined,
        email: undefined,
        phoneNumber: undefined,
        organizationID: undefined,
        accountType: undefined,
        isDarkMode: undefined
    })

    // public int ID { get; set; }
    //     public int YardID { get; set; }
    //     public int UserID { get; set; }
    //     public int OrganizationID { get; set; }
    //     public long DateUpdated { get; set; }
    //     public string? Details { get; set; }

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
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
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

    useEffect(() => {
        const FetchLastYardUpdate = async () => {
            let yardUpdate = await GetLastYardUpdate(id);
            console.log(yardUpdate);
            setLastYardUpdate(yardUpdate);
        }
        FetchLastYardUpdate();
    }, []);

    useEffect(() => {
        const FetchLastUpdateUser = async () => {
            let user = await GetUserByID(lastYardUpdate.userID);
            console.log(user);
            setLastUpdateUser(user);
        }
        if(lastYardUpdate.userID != undefined) {
            FetchLastUpdateUser();
        }
    }, [lastYardUpdate]);

    const FormatUserName = (name: string | undefined) => {
        if(name != undefined) {
            const nameArray = name.split(", ");   
            return `${nameArray[1]} ${nameArray[0]}`;
        }
    }

    const FormatDateTime = (unixTime: number | undefined) => {
        if(unixTime != undefined) {
            let a = new Date(unixTime * 1000);
            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();
            let hour = a.getHours();
            let min = a.getMinutes();
            let minStr = `${min}`;
            let AMPM = 'AM';
            if (hour > 12) {
                hour = hour - 12;
                AMPM = 'PM'
            }
            if (min < 10) {
                minStr = `0${min}`;
            }
            let time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + minStr + AMPM;
            return time;
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Driver Info</Popover.Header>
            <Popover.Body>
                <p>Phone Number: {lastUpdateUser.phoneNumber}</p>
                <p>Email: {lastUpdateUser.email}</p>
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
                                <p className="align-self-center m-0">Last updated on: {FormatDateTime(lastYardUpdate.dateUpdated)}</p>
                            </Col>
                            <Col className="col-6 d-flex justify-content-end">
                                <p className="d-inline m-0 align-self-center">Updated by: {FormatUserName(lastUpdateUser.name)}</p>
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
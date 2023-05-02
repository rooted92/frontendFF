import { useState } from "react";
import { Container, Row, Col, Popover, OverlayTrigger, Button, Table } from 'react-bootstrap';
import Footer from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";

const TableComponent = (): JSX.Element => {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Driver Info</Popover.Header>
            <Popover.Body>
                <p>707-333-3333</p>
                <p>email@email.com</p>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent />
                    <Container>
                        <Row>
                            <Col className="col-12">
                                <p>Name of Yard</p>
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
                                        <tr>
                                            <td>314</td>
                                            <td>Reefer</td>
                                            <td>Loaded</td>
                                            <td>Clean</td>
                                            <td>3/4</td>
                                            <td>53ft</td>
                                            <td>Flat tire passenger side rear axle</td>
                                        </tr>
                                        <tr>
                                            <td>5004</td>
                                            <td>Dry Van</td>
                                            <td>Empty</td>
                                            <td>Clean</td>
                                            <td>N/A</td>
                                            <td>50ft</td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td>705</td>
                                            <td>Tanker</td>
                                            <td>Empty</td>
                                            <td>Dirty</td>
                                            <td>N/A</td>
                                            <td>42ft</td>
                                            <td>Climbing ladder is bent</td>
                                        </tr>
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
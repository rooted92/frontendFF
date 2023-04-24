import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Footer from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";

const TableComponent = (): JSX.Element => {

    

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent />
                    <Container>
                        <Row>
                            <Col className="col-12">
                                <p></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-6">
                            
                            </Col>
                            <Col className="col-6">
                            
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
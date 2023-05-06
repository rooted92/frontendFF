import React, {useState, useEffect} from 'react'
import '../../index.css'
import { Row, Col, Navbar, Container, Nav, NavDropdown, Card, Button, Form } from 'react-bootstrap'
import Logo from '../../assets/fleetlogo.png'
import Bell from '../../assets/Bell.png'
import NavbarComponent from '../NavbarComponent'
import Footer from '../FooterComponent'

export default function SubmitTrailerCount() {

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

    return (
        <div>
            <NavbarComponent accountType={userInfo.accountType} />

            <Container>
                <Row>
                    <Col className='pt-3 d-flex justify-content-end'>
                        <Button variant='danger'>Cancel</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className='d-flex justify-content-center pt-5'>
                    <Col className='d-flex justify-content-center'>
                        <Card style={{ width: '33rem', height: '31rem' }}>
                            <Card.Body>
                                <Card.Title className='text-center trfCuz'> Trailer Count Form </Card.Title>
                                <Form.Group as={Col} className="col-12 mb-3" controlId="accountType">
                                    <Form.Select className="inputFieldStyle" defaultValue="Location">
                                        <option>Location</option>
                                        <option>Dispatcher</option>
                                        <option>Driver</option>
                                        <option>Organization</option>
                                    </Form.Select>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Control className="inputFieldStyle" type="text" placeholder="Trailer Name" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Control className="inputFieldStyle" type="text" placeholder="Type" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='pt-3'>
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Control className="inputFieldStyle" type="text" placeholder="Empty/Loaded" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Control className="inputFieldStyle" type="text" placeholder="Clean/Dirty" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='pt-3'>
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Control className="inputFieldStyle" type="text" placeholder="Fuel Level" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Control className="inputFieldStyle" type="text" placeholder="Length" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='pt-3'>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Control style={{height: '5rem'}} className="inputFieldStyle" type="text" placeholder="Additional details..." />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className='pt-4 d-flex justify-content-end'>
                                    <Button>Add Trailer</Button>
                                    </Col>
                                </Row>


                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <Card style={{ width: '25rem', height: '31rem' }}>
                            <Card.Body>
                                <Card.Title className='text-center trfCuz'>Trailers Added</Card.Title>
                                <Row className='lineCuz'>
                                    <Col>
                                     <hr ></hr>
                                    </Col>
                                </Row>
                               
                               <Row>
                                <Col className='fCuz'>
                                   
                                <Button className='buttonColor'>Finish</Button>
                                </Col>
                               </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            
                <Row className='footCuz'>
                    <Col>
                    <Footer />
                    </Col>
                </Row>
        </div>
    )
}

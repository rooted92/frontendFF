import { useState, useEffect } from 'react'
import '../../index.css'
import { Row, Col, Container, Card, Button, Form } from 'react-bootstrap'
import NavbarComponent from '../NavbarComponent'
import Footer from '../FooterComponent';
import { useNavigate } from 'react-router-dom'

export default function SubmitTrailerCount() {

    let navigate = useNavigate();

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

    const handleCancelSubmission = () => {
        navigate('/DriverDashboard');
    }

    const handleSubmitForm = () => {
        navigate('/ThankYouForSubmission');
    }

    const handleAddTrailer = () => {
        console.log('trailer added!');
    }

    const handleAddNewLocation = () => {
        console.log('New location form opened');
    }

    return (
        <div className='pageContainer'>
            <div className='mainContent'>
                <NavbarComponent accountType={userInfo.accountType} />

                <Container>
                    <Row>
                        <Col className='pt-3 d-flex justify-content-end'>
                            <Button onClick={handleCancelSubmission} variant='danger'>Cancel</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className='d-flex justify-content-center pt-5 mb-5'>
                        <Col className='d-flex justify-content-center'>
                            <Card style={{ width: '33rem', height: '31rem' }}>
                                <Card.Body>
                                    <Card.Title className='text-center trfCuz'> Trailer Count Form </Card.Title>
                                    <Form.Group as={Col} className="col-12 mb-3" controlId="accountType">
                                        <Form.Select className="inputFieldStyle" defaultValue="Location">
                                            <option>Location</option>
                                            {/* Here we will have a dropdown of all yards to users organization */}
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
                                                <Form.Control style={{ height: '5rem' }} className="inputFieldStyle" type="text" placeholder="Additional details..." />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className='justify-content-center gap-2'>
                                        <Col className='col-4 pt-4 d-flex justify-content-end'>
                                            <Button onClick={handleAddTrailer} type='button'>Add Trailer</Button>
                                        </Col>
                                        {/* <Col className='col-4 pt-4 d-flex justify-content-center'>
                                            <Button className='btn-primary' onClick={handleAddNewLocation} >Add New Location</Button>
                                        </Col> */}
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
                                            <hr></hr>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className='fCuz'>

                                            <Button onClick={handleSubmitForm} className='buttonColor'>Finish</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

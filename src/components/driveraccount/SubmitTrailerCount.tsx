import { useState, useEffect } from 'react'
import '../../index.css'
import { Row, Col, Container, Card, Button, Form } from 'react-bootstrap'
import NavbarComponent from '../NavbarComponent'
import Footer from '../FooterComponent';
import { useNavigate } from 'react-router-dom'
import { AddTrailer, GetAllYards } from '../../services/DataService';
import DeleteIcon from '../../assets/delete.svg';
import LoadingPageComponent from '../LoadingPageComponent';

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

    const [number, setNumber] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<string>('');
    const [isClean, setIsClean] = useState<string>('');
    const [fuel, setFuel] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [locationID, setLocationID] = useState<string>('');
    const [yardLocations, setYardLocations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(true);

    // array to store trailer objects
    const [trailerArray, setTrailerArray] = useState<any[]>([]);
    // array to store past submissions
    const [pastSubmissions, setPastSubmissions] = useState<any>({});

    // const [orgID, setOrgID] = useState<number>(0);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

    useEffect(() => {
        const fetchYardArray = async () => {
            setYardLocations(await GetAllYards(userInfo.organizationID));
        };
        if (userInfo.organizationID !== undefined) {
            fetchYardArray();
        }
        console.log(yardLocations);
    }, [userInfo]);

    const handleCancelSubmission = () => {
        navigate('/DriverDashboard');
    }

    const handleSubmitForm = async () => {
        // pass in array into fetch here
        setIsLoading(true);
        console.log(trailerArray);
        let isTrailerArrayAdded = await AddTrailer(trailerArray, userInfo.id);
        console.log(isTrailerArrayAdded);
        if (isTrailerArrayAdded) {
            console.log('Trailer Array added!');
            navigate('/ThankYouForSubmission');
        } else {
            alert('Trailer not added. Check all fields are filled.');
        }
        setIsLoading(false);
        // this line is not deleting trailers
        // setTrailerArray(trailerArray => [...trailerArray, []]);
        // console.log(trailerArray);
    }

    const handleAddTrailer = async () => {
        let trailerObject = {
            TrailerNumber: number,
            Type: type,
            Load: isLoaded,
            Cleanliness: isClean,
            FuelLevel: fuel,
            Length: length,
            Details: details,
            PossessionID: locationID,//location id
            OrganizationID: userInfo.organizationID
        };
        // create trailer array in here
        if (number === '' || type === '' || isLoaded === '' || isClean === '' || fuel === '' || length === '') {
            setIsCompleted(false);
            return;
        } else {
            // we add trailer objects to array here
            setTrailerArray(trailerArray => [...trailerArray, trailerObject]);
        }
        // console.log(trailerArray);
    }

    const handleDeleteTrailerFromList = (yardObject: any) => {
        let yardIndex = trailerArray.indexOf(yardObject);
        // console.log('Yard Index: ', yardIndex);
        trailerArray.splice(yardIndex, 1);
        setTrailerArray([...trailerArray]);
        // console.log(trailerArray);
    }

    // useEffect that listens for a change in
    useEffect(() => {
        // console.log('trailerArray.length changed');
        console.log(trailerArray);
    }, [trailerArray]);

    // const handleAddNewLocation = () => {
    //     console.log('New location form opened');
    // }

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

                {
                    isLoading ?
                        <LoadingPageComponent />
                        :
                        <Container>
                            <Row className='d-flex justify-content-center pt-5 mb-5'>
                                <Col className='d-flex justify-content-center col-6 col-sm-9' xs={12} sm={9} lg={6}>
                                    <Card style={{ width: '33rem', height: '31rem' }}>
                                        <Card.Body>
                                            <Card.Title className='text-center trfCuz'> Trailer Count Form </Card.Title>
                                            <Form.Group as={Col} className="col-12 mb-3" controlId="accountType">
                                                <Form.Select
                                                    onChange={e => { setLocationID(e.target.value) }}
                                                    className="inputFieldStyle"
                                                    defaultValue='Select Yard'>
                                                    <option disabled>Select Yard</option>
                                                    {/* Here we will have a dropdown of all yards to users organization */}
                                                    {
                                                        yardLocations.map((location: any, index: number) => {
                                                            return <option key={index} value={location.id}>{location.name}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId="trailerNumber">
                                                        <Form.Control onChange={e => { setNumber(e.target.value) }} className="inputFieldStyle" type="text" placeholder="Trailer Number" />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="trailerType">
                                                        <Form.Select
                                                            onChange={e => { setType(e.target.value) }}
                                                            className='inputFieldStyle'
                                                            defaultValue='Select Trailer Type'>
                                                            <option disabled>Select Trailer Type</option>
                                                            <option value="Dry Van">Dry Van</option>
                                                            <option value="Refrigerated">Refrigerated</option>
                                                            <option value="Tanker">Tanker</option>
                                                            <option value="Flatbed">Flatbed</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className='pt-3'>
                                                <Col>
                                                    <Form.Group controlId="loadedStatus">
                                                        <Form.Select
                                                            onChange={e => { setIsLoaded(e.target.value) }}
                                                            className='inputFieldStyle'
                                                            defaultValue='Select Load Status'>
                                                            <option disabled>Select Load Status</option>
                                                            <option value="Empty">Empty</option>
                                                            <option value="Loaded">Loaded</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="cleanlinessStatus">
                                                        <Form.Select
                                                            onChange={e => { setIsClean(e.target.value) }}
                                                            className='inputFieldStyle'
                                                            defaultValue='Select Cleanliness Status'>
                                                            <option disabled>Select Cleanliness Status</option>
                                                            <option value="Dirty">Dirty</option>
                                                            <option value="Clean">Clean</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className='pt-3'>
                                                <Col>
                                                    <Form.Group controlId="fuelLevel">
                                                        <Form.Select
                                                            onChange={e => { setFuel(e.target.value) }}
                                                            className='inputFieldStyle'
                                                            defaultValue='Select Fuel Level'>
                                                            <option disabled>Select Fuel Level</option>
                                                            <option value="N/A">N/A</option>
                                                            <option value="Empty">Empty</option>
                                                            <option value="1/8">1/8</option>
                                                            <option value="1/4">1/4</option>
                                                            <option value="3/8">3/8</option>
                                                            <option value="1/2">1/2</option>
                                                            <option value="5/8">5/8</option>
                                                            <option value="3/4">3/4</option>
                                                            <option value="7/8">7/8</option>
                                                            <option value="Full">Full</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="trailerLength">
                                                        <Form.Select
                                                            onChange={e => { setLength(e.target.value) }}
                                                            className='inputFieldStyle'
                                                            defaultValue='Select Trailer Length'>
                                                            <option disabled>Select Trailer Length</option>
                                                            <option value="36ft">36ft</option>
                                                            <option value="48ft">48ft</option>
                                                            <option value="50ft">50ft</option>
                                                            <option value="53ft">53ft</option>r
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className='pt-3'>
                                                <Col>
                                                    <Form.Group controlId="details">
                                                        <Form.Control onChange={e => { setDetails(e.target.value) }} style={{ height: '5rem' }} className="inputFieldStyle" type="text" placeholder="Additional details..." />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                                    
                                            <Row className='justify-content-between'>
                                                <Col className='col-7 align-self-center'>
                                                <p className='fIncomplete'>{isCompleted ? null: 'Form is incomplete'}</p>
                                                </Col>
                                                <Col className='col-5 pt-4 align-self-center'>
                                                    
                                                    <Button onClick={handleAddTrailer} type='button'>Add Trailer</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className='d-flex justify-content-center mt-5 mt-lg-0'  xs={12} sm={9} lg={6}>
                                    <Card style={{ width: '25rem', height: '31rem' }}>
                                        <Card.Body className='overflow-auto'>
                                            <Card.Title className='text-center trfCuz'>Trailers Added</Card.Title>
                                            <Row className='justify-content-center'>
                                                {
                                                    trailerArray.length === 0
                                                        ? null :
                                                        trailerArray.map((trailer: any, index: number) => {
                                                            return (
                                                                <>
                                                                    <Col key={index} className='col-10 d-flex flex-row justify-content-between mb-3 inputFieldStyle rounded'>
                                                                        <p className='align-self-center m-0 fs-4 fw-bold'>{trailer.TrailerNumber}</p>
                                                                        <button onClick={() => { handleDeleteTrailerFromList(trailer) }} className='btn btn-transparent' >
                                                                            <img src={DeleteIcon} height={'25px'} width={'auto'} alt="delete icon" />
                                                                        </button>
                                                                    </Col>
                                                                </>
                                                            );
                                                        })
                                                }

                                            </Row>
                                            {/* <Row className='lineCuz'>
                                        <Col>
                                            <hr></hr>
                                        </Col>
                                    </Row> */}
                                            <hr />
                                            <Row>
                                                <Col className='fCuz'>
                                                    <Button onClick={handleSubmitForm} className='buttonColor'>Submit</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                }

            </div>
            <Footer />
        </div>
    )
}


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../FooterComponent";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import { GetAllYards, GetUserByOrganization, FormatName } from "../../services/DataService";

const TrailerCountRequestForm = (): JSX.Element => {

    const [userInfo, setUserInfo] = useState({
        id: undefined,
        name: undefined,
        email: undefined,
        phoneNumber: undefined,
        organizationID: undefined,
        accountType: undefined,
        isDarkMode: undefined
    });
    const [yards, setYards] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<any[]>([]);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
        }
    }, []);

    useEffect(() => {
        const fetchYardNames = async (orgID: any) => {
            let yardData = await GetAllYards(orgID);
            let yardArray = yardData.map((yard: any) => {
                return yard.name;
            })
            // console.log(yardData);
            // console.log(yardArray);
            setYards(yardArray);
        }
        fetchYardNames(userInfo.organizationID);
        const fetchDrivers = async (orgID: any) => {
            let driverData = await GetUserByOrganization(orgID);
            let driverArray = driverData.map((driver: any) => {
                if(driver.accountType === 'Driver'){
                    // return FormatName(driver.name);
                    return driver.name;
                }
            })
            setDrivers(driverArray);
            // console.log(driverData);
            // console.log(driverArray);
        }
        fetchDrivers(userInfo.organizationID);
    }, [userInfo]);

    let navigate = useNavigate();

    const handleCancel = () => {
        if(userInfo.accountType === 'Dispatcher'){
            navigate('/DispatchDashboard');
        } else navigate('/AdminDashboard')
        
    }

    const handleSubmit = () => {
        console.log('submitted!');
    }

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    {/* Navbar Here */}
                    <NavbarComponent accountType={userInfo.accountType} />
                    <Container className="my-5">
                        
                        <Row className="d-flex justify-content-center">
                            <Col className="col-lg-4 col-xl-4 col-sm-6 requestForm p-4" md={6}>
                                <h2 className="text-center fw-bold">Trailer Count Request</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="yardLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Location</option>
                                            {
                                                yards.map((yard: any) => {
                                                    return <option>{yard}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="driver">
                                        <Form.Label>Driver</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Driver</option>
                                            {
                                                drivers.map((driver: any) => {
                                                    if(driver !== undefined){
                                                        return <option>{FormatName(driver)}</option>
                                                    }
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Row className="mt-3">
                                        <Col className="col-6">
                                            <Button
                                            className="bg-danger btn border-danger w-100"
                                            onClick={handleCancel} >
                                                Cancel
                                            </Button>

                                        </Col>
                                        <Col className="col-6 d-flex flex-row justify-content-end">
                                            <Button
                                            className="lightBlueBG btn w-100" 
                                            onClick={handleSubmit} >
                                                Submit
                                            </Button>
                                        </Col>

                                    </Row>

                                </Form>
                            </Col>
                        </Row>
                    </Container>

                </div>
                <Footer />
            </div>
        </>
    )
}

export default TrailerCountRequestForm;
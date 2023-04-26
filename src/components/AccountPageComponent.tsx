import { useEffect, useState } from "react";
import { Container, Col, Row, ListGroup, Button, Modal } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import Footer from "./FooterComponent";
import { GetLoggedInUserData } from "../services/DataService";

const AccountPage = (): JSX.Element => {

    const [userData, setUserData] = useState({
        id: null,
        name: null,
        email: null,
        phoneNumber: null,
        organizationID: null,
        accountType: null,
        isDarkMode: null});

        useEffect(() => {
            const userInfo = JSON.parse(localStorage.getItem('userData')!);
        if (userData) {
            setUserData(userInfo);
        }
        }, [userData]);


    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem(''));
    //     if (items) {
    //         setItems(items);
    //     }
    // }, []);

    // const user = async () => {
    //     let userData: any = await GetLoggedInUserData(userInfo.email);
    //     return userData;
    // };

    // useEffect(() => {
    //     user();
    // }, []);

    // console.log(userInfo);

    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const handleDeleteAccount = () => {
        console.log("Account Deleted");
        setShowDelete(false);
    };

    const handleUpdateAccount = () => {
        console.log("Account Updated");
        setShowUpdate(false);
    };

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent />
                    <Container>
                        <Row className="mt-4">
                            <Col className="col-6">
                                <p className="fs-3 p-auto blueText">Account</p>
                            </Col>
                            <Col className="col-6 d-flex justify-content-end">DakrMode</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="col-4">
                                <ListGroup className="listGroupStyleTemplate">
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        <p className="fs-2 m-0">{userData.accountType}</p>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        Email: {userData.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        Phone: {userData.phoneNumber}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        Name: {userData.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-4 lightBlueBorder">
                                        <Container>
                                            <Row className="d-flex justify-content-center">
                                                <Col className="d-flex justify-content-end">
                                                    <Button
                                                        className="darkBlueBG"
                                                        onClick={handleShowUpdate}
                                                    >
                                                        Update Account
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        className="btn-danger"
                                                        onClick={handleShowDelete}
                                                    >
                                                        Delete Account
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroup.Item>
                                </ListGroup>
                                {/* Delete Account Modal */}

                                <Modal show={showDelete} onHide={handleCloseDelete}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete your account?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            className="btn-danger"
                                            onClick={handleDeleteAccount}
                                        >
                                            Delete
                                        </Button>
                                        <Button className="lightBlueBG" onClick={handleCloseDelete}>
                                            Cancel
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* Update Account Modal */}
                                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>UPDATE ACCOUNT HERE</Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            className="darkBlueBG"
                                            onClick={handleUpdateAccount}
                                        >
                                            Update
                                        </Button>
                                        <Button className="lightBlueBG" onClick={handleCloseUpdate}>
                                            Cancel
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AccountPage;

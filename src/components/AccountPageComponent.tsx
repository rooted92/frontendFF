import { useEffect, useState } from "react";
import { Container, Col, Row, ListGroup, Button, Modal } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import Footer from "./FooterComponent";
import { GetLoggedInUserData } from "../services/DataService";
import { UpdateEmail, UpdatePasswaord, UpdateUser } from "../services/DataService";

const AccountPage = (): JSX.Element => {

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
            console.log(userInfo)
        }
    }, []);


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

    const [id, setId] = useState('');
    const [getNewName, setGetNewName] = useState('');
    const [getNewEmail, setGetNewEmail] = useState('');
    const [getNewNumber, setGetNewNumber] = useState('');
    const [getNewPassword, setGetNewPassword] = useState('');

    // const handlegetNewName = () => setGetNewName()

    useEffect(() => {
        // console.log(userInfo)
    }, [userInfo])

    const handleDeleteAccount = () => {
        console.log("Account Deleted");
        setShowDelete(false);
    };

    const handleUpdateAccount = async (userId: string, newEmail: string, newPassword: string, newName: string) => {
        const userUpdate = await UpdateUser(userInfo);
        console.log(userInfo.name);
        console.log(userUpdate);
        // call email function
        if (userUpdate) {
            handleCloseUpdate();
        } else {
            alert('Unable to save changes')
        }
        console.log(userInfo.name);
        console.log(userInfo);
        console.log("Account Updated");
        // call password function else return;
    };

    return (
        <>
            <div className="pageContainer">
                <div className="mainContent">
                    <NavbarComponent accountType={userInfo.accountType} />
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
                                        <p className="fs-2 m-0">{userInfo.accountType}</p>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        Email: {userInfo.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        Phone: {userInfo.phoneNumber}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-3 lightBlueBorder">
                                        Name: {userInfo.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-4 lightBlueBorder">
                                        <Container>
                                            <Row className="d-flex justify-content-center">
                                                <Col className="d-flex justify-content-end">
                                                    <Button
                                                        className="darkBlueBG"
                                                        onClick={handleShowUpdate}
                                                    >
                                                        Edit Profile
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
                                    <Modal.Body>
                                        <Row>
                                            <Col lg={12}>
                                                <p className=" fs-1 editProfileText">Edit Profile</p>
                                                <input onChange={(e) => {
                                                    setGetNewName(e.target.value)
                                                }} className="editEmailInput" type="text" placeholder="Edit Name"></input>
                                            </Col>
                                            <Col lg={12} className="pt-3">
                                                <input onChange={(e) => {
                                                    setGetNewNumber(e.target.value)
                                                }} className="editEmailInput" type="number" placeholder="Edit Phonenumber"></input>
                                            </Col>
                                            <Col lg={12} className="pt-3">
                                                <input onChange={(e) => {
                                                    setGetNewEmail(e.target.value)
                                                }} className="editEmailInput" type="email" placeholder="Edit Email"></input>
                                            </Col>
                                            <Col lg={12} className="pt-3">
                                                <input onChange={(e) => {
                                                    setGetNewPassword(e.target.value)
                                                }} className="editEmailInput" type="password" placeholder="Edit Password"></input>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            className="darkBlueBG"
                                            onClick={() => handleUpdateAccount(id, getNewEmail, getNewPassword, getNewName)}
                                        >
                                            Update Profile
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

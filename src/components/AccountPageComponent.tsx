import { useEffect, useState } from "react";
import { Container, Col, Row, ListGroup, Button, Modal } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import Footer from "./FooterComponent";
import { GetLoggedInUserData } from "../services/DataService";
import { UpdatePasswaord, UpdateUser, DeleteUser } from "../services/DataService";
import { Navigate, useNavigate } from "react-router-dom";



const AccountPage = (): JSX.Element => {

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
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
        if (userInfo) {
            setUserInfo(userInfo);
            console.log(userInfo);
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

    // const [id, setId] = useState('');
    // const [getNewName, setGetNewName] = useState('');
    // const [getNewEmail, setGetNewEmail] = useState('');
    // const [getNewNumber, setGetNewNumber] = useState('');
    const [getNewPassword, setGetNewPassword] = useState('');

    // const handlegetNewName = () => setGetNewName()

    useEffect(() => {
        // console.log(userInfo)
    }, [userInfo])

    const handleDeleteAccount = async () => {

        //Peform any validation we need for it
        const DeletedUser = await DeleteUser(userInfo.id);
        console.log(DeleteUser);
        setShowDelete(true);
        //If statement for delete
        if (DeletedUser == true) {
            navigate('/')
        }else{
            console.log('Unable to delete Account');
        }
        
        console.log("Account Deleted");
    };

    const FormatName = (name: any) => {
        return name.split(' ').reverse().map((item: string) => {
            return `${item.charAt(0).toUpperCase()}${item.substring(1).toLowerCase()}`
        }).join(', ');
    }

    // const 

    const handleUpdateAccount = async (newPassword: string) => {
        const userUpdate = await UpdateUser(userInfo);
        console.log(userInfo.name);
        console.log(userUpdate);
        // call email function
        if (userUpdate) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            handleCloseUpdate();
        } else {
            alert('Unable to save changes')
        }
        if (newPassword !== '') {
            const isPasswordUpdated = await UpdatePasswaord(userInfo.id, newPassword);
            console.log(isPasswordUpdated);
            console.log(newPassword);
            isPasswordUpdated ? handleCloseUpdate() : alert('Unable to save password');
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
                                                <input defaultValue={userInfo.name} onChange={(e: any) => {
                                                    console.log(e.target.value);
                                                    let formattedName: any = FormatName(e.target.value);
                                                    console.log(formattedName);
                                                    setUserInfo({
                                                        id: userInfo.id,
                                                        name: formattedName,
                                                        email: userInfo.email,
                                                        phoneNumber: userInfo.phoneNumber,
                                                        organizationID: userInfo.organizationID,
                                                        accountType: userInfo.accountType,
                                                        isDarkMode: userInfo.isDarkMode
                                                    });
                                                }} className="editEmailInput" type="text" placeholder="Edit Name"></input>
                                            </Col>
                                            <Col lg={12} className="pt-3">
                                                <input defaultValue={userInfo.phoneNumber} onChange={(e: any) => {
                                                    setUserInfo({
                                                        id: userInfo.id,
                                                        name: userInfo.name,
                                                        email: userInfo.email,
                                                        phoneNumber: e.target.value,
                                                        organizationID: userInfo.organizationID,
                                                        accountType: userInfo.accountType,
                                                        isDarkMode: userInfo.isDarkMode
                                                    })
                                                }} className="editEmailInput" type="text" placeholder="Edit Phonenumber"></input>
                                            </Col>
                                            <Col lg={12} className="pt-3">
                                                <input defaultValue={userInfo.email} onChange={(e: any) => {
                                                    setUserInfo({
                                                        id: userInfo.id,
                                                        name: userInfo.name,
                                                        email: e.target.value,
                                                        phoneNumber: userInfo.phoneNumber,
                                                        organizationID: userInfo.organizationID,
                                                        accountType: userInfo.accountType,
                                                        isDarkMode: userInfo.isDarkMode
                                                    })
                                                }} className="editEmailInput" type="email" placeholder="Edit Email"></input>
                                            </Col>
                                            <Col lg={12} className="pt-3">
                                                <input onChange={(e) => {
                                                    setGetNewPassword(e.target.value)
                                                }} className="editEmailInput" type="password" placeholder="Change Password"></input>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            className="darkBlueBG"
                                            onClick={() => handleUpdateAccount(getNewPassword)}
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

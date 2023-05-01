import { useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent";
import { useState, useEffect } from "react";

const AdminDashboard = (): JSX.Element => {

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
    <>
        <div>
            
        </div>
    </>
    )
}

export default AdminDashboard;


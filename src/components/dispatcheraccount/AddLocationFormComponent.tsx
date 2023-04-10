import { useNavigate } from "react-router-dom";
import Footer from "../FooterComponent";


const AddLocationForm = () => {

    let navigate = useNavigate();



    return (
        <>
        <div className="pageContainer">
            <div className='mainContent'>
             {/* Navbar here */}
             Content Here
            </div>
            <Footer />
        </div>
        </>
    );
}

export default AddLocationForm;
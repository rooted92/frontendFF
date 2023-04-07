import './App.css';
import NavbarComponent from './components/NavbarComponent';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DriverDashBoard from './components/DriverDashBoard';
import DriverWelcomePage from './components/DriverWelcomePage';
import SignUpConfirmation from './components/SignUpConfirmation';

function App(){
  return (
    // <NavbarComponent />
    <DriverDashBoard />
      // <DriverWelcomePage />
      // <SignUpConfirmation />

  );
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignIn } from './components/SignInComponent';
import SignUp from './components/SignUpComponent';
import DispatchDashboard from './components/dispatcheraccount/DispatchDashboard';
import DriverDashBoard from './components/driveraccount/DriverDashBoard';
// import WelcomeMessage from './components/WelcomeMsgComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrailerCountRequestForm from './components/dispatcheraccount/TrailerCountRequestFormComponent';
import AddLocationForm from './components/dispatcheraccount/AddLocationFormComponent';
import ConfirmationMessage from './components/dispatcheraccount/ConfirmationMsgComponent';
import SubmitTrailerCount from './components/driveraccount/SubmitTrailerCount';
import ThankYouForSubmission from './components/driveraccount/ThankYouForSubmission';
import DriverAccount from './components/driveraccount/DriverAccount';
import SignUpConfirmation from './components/SignUpConfirmation';
import AccountPage from './components/AccountPageComponent';
import TableComponent from './components/TableComponent';
import { Tab } from 'react-bootstrap';

function App() {
  return (
    // <div className='appContainer'>
      <BrowserRouter>
        {/* <SignIn /> */}
        <Routes>
          <Route path='/' element={<SignIn />}></Route>
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='DispatchDashboard' element={<DispatchDashboard />} />
          <Route path='/DriverDashboard' element={<DriverDashBoard />} />
          {/* May not need welcome component in route... Probably not needed, continue testing.. */}
          {/* <Route path='/WelcomeMessage' element={<WelcomeMessage/>} /> */}
          <Route path='/TrailerCountRequestForm' element={<TrailerCountRequestForm />}></Route>
          <Route path='/AddLocationForm' element={<AddLocationForm />} />
          <Route path='/SubmitTrailerCount' element={<SubmitTrailerCount />} />
          <Route path='/ThankYouForSubmission' element={<ThankYouForSubmission />} />
          <Route path='/DriverAccount' element={<DriverAccount />} />
          <Route path='/SignUpConfirmation' element={<SignUpConfirmation />} />
          <Route path='/AccountPage' element={<AccountPage />} />
          <Route path='/YardDetails' element={<TableComponent />} />
        </Routes>
      </BrowserRouter >
    // </div>
  )
}

export default App;

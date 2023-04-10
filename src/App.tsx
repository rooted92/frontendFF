import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/SignInComponent';
import SignUp from './components/SignUpComponent';
import DispatchDashboard from './components/dispatcheraccount/DispatchDashboard';
// import WelcomeMessage from './components/WelcomeMsgComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div className='appContainer'>
      <BrowserRouter>
        {/* <SignIn /> */}
        <Routes>
          <Route path='/' element={<SignIn />}></Route>
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='DispatchDashboard' element={<DispatchDashboard />} />
          {/* May not need welcome component in route... Probably not needed, continue testing.. */}
          {/* <Route path='/WelcomeMessage' element={<WelcomeMessage/>} /> */}
        </Routes>
      </BrowserRouter >
    // </div>
  )
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/SignInComponent';
import SignUp from './components/SignUpComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <SignIn />
      <Routes>
        {/* <Route path='/SignUp' element={<SignUp />}> */}
        {/*  */}
      </Routes>
    </BrowserRouter >
  )
}

export default App;

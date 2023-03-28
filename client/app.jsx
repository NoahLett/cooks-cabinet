import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/sign-up';
import Login from './pages/sign-in';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<Login/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/sign-up';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

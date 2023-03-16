import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar/>
        <Home />
      </>
    );
  }
}

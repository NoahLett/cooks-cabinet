import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

export default function Navbar() {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className='menu-icon'>
            {click ? <FaTimes onClick={handleClick}/> : <FaBars onClick={handleClick}/>}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
            <li className='nav-item'>
              <a href='#' className='nav-links' onClick={closeMobileMenu}>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a href='#wanted' className='nav-links' onClick={closeMobileMenu}>
                Wanted Books
              </a>
            </li>
            <li className='nav-item'>
              <a href='#for-sale' className='nav-links' onClick={closeMobileMenu}>
                Books for Sale
              </a>
            </li>
            <li className='nav-item'>
              <a href='#post-form' className='nav-links' onClick={closeMobileMenu}>
                Post
              </a>
            </li>
            <li className='nav-item'>
              <a href='#faq' className='nav-links' onClick={closeMobileMenu}>
                FAQ
              </a>
            </li>
            <li className='nav-item'>
              <button className='nav-links'>Sign Up</button>
            </li>
          </ul>
          <Link to='/' className='navbar-logo'>
            CooksCabinet
          </Link>
          <div className="user-icon">
            <FaUser/>
          </div>
        </div>
      </nav>
    </div>
  );
}

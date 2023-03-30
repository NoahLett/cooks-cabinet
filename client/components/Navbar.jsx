import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/authSlice';
import './Navbar.css';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

export default function Navbar() {

  const isLoggedIn = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleSignOut = async e => {
    try {
      await dispatch(signOut());
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className='menu-icon'>
            {click ? <FaTimes onClick={handleClick}/> : <FaBars onClick={handleClick}/>}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Wanted Books
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Books for Sale
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Post
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                FAQ
              </Link>
            </li>
            <li className='nav-item'>
              <div>{isLoggedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button><Link to='/signin'>Sign In</Link></button>}</div>
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

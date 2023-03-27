import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';

const SignIn = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  return (
    <div className='signin-container'>
      { success
        ? (
          <div className='success-container'>
            <h1 className='success-header'>`Welcome back, ${username}`</h1>
            <p>
              <Link to='/'>Create a Recipe</Link>
            </p>
          </div>
          )
        : (
          <div className='signin-component'>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreeen'}>{errMsg}</p>
            <h1 className='signin-header'>Sign In</h1>
            <form className='signin-form'>
              <label className='signin-label' htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                className='signin-input'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={e => setUsername(e.target.value)}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)} />
            </form>
          </div>
          )}
    </div>
  );
};

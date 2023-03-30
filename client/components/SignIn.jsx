import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/authSlice';
import './SignIn.css';

const SignIn = () => {

  const isLoggedIn = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(signIn(username, password));
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div className='signin-container'>
      { isLoggedIn
        ? (
          <div className='success-container'>
            <h1 className='success-header'>Welcome back, {username}!</h1>
            <p>
              <Link to='/'>Create a Recipe</Link>
            </p>
          </div>
          )
        : (
          <div className='signin-component'>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreeen'}>{errMsg}</p>
            <h1 className='signin-header'>Sign In</h1>
            <form className='signin-form' onSubmit={handleSubmit}>
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
                autoFocus
                  />

              <label className='signin-label' htmlFor='password'>
                Password:
              </label>
              <input
                type="password"
                className='signin-input'
                id='password'
                onChange={e => setPassword(e.target.value)}
                required
                  />

              <button className='signin-submit' disabled={!!(!username || !password)}>Sign In</button>
            </form>
            <p className='register-link'>
              Create an Account <Link className='register-link' to='/signup'>Here</Link>
            </p>
          </div>
          )}
    </div>
  );
};

export default SignIn;

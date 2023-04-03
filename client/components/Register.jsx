import React, { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/sign-up',
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSuccess(true);
      return response;
    } catch (err) {
      if (!err.response) {
        setErrMsg('No server response');
      } else {
        setErrMsg('Username taken');
      }
    }
  };

  return (
    <div className='register-container'>
      {success
        ? (
          <div className='section'>
            <h1 className='success'>Success!</h1>
            <p>
              <Link className='sign-in-link' to='/signin'>Sign In</Link>
            </p>
          </div>
          )
        : (
          <div className='section'>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            <h1 className='register-header'>Register</h1>
            <form className='register-form' onSubmit={handleSubmit}>
              <label className='register-label' htmlFor="username">
                Username:
                <span className={validName ? 'valid' : 'hide'}>
                  <FaCheck />
                </span>
                <span className={validName || !username ? 'hide' : 'invalid'}>
                  <FaTimes />
                </span>
              </label>
              <input
                className='input-field'
                type="text"
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={e => setUsername(e.target.value)}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}/>
              <p className={userFocus && username && !validName ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label className='register-label' htmlFor="password">
                Password:
                <span className={validPwd ? 'valid' : 'hide'}>
                  <FaCheck />
                </span>
                <span className={validPwd || !password ? 'hide' : 'invalid'}>
                  <FaTimes />
                </span>
              </label>
              <input
                className='input-field'
                type="password"
                id='password'
                onChange={e => setPassword(e.target.value)}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}/>
              <p className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters:
                <span>!</span>
                <span>@</span>
                <span>#</span>
                <span>$</span>
                <span>%</span>
              </p>

              <label className='register-label' htmlFor="confirmpwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                  <FaCheck />
                </span>
                <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                  <FaTimes />
                </span>
              </label>
              <input
                className='input-field'
                type="password"
                id='confirmpwd'
                onChange={e => setMatchPwd(e.target.value)}
                required
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}/>
              <p className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                Must match the first password input field.
              </p>

              <button className='register-submit' disabled={!!(!validName || !validPwd || !validMatch)}>Sign Up</button>
            </form>
            <p>
              Already Registered? <br/>
              <span>
                <Link className='sign-in-link' to='/'>Sign In</Link>
              </span>
            </p>
          </div>
          )}
    </div>
  );
};

export default Register;

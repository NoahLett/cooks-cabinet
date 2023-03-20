import React, { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
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
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {success
        ? (
          <div>
            <h1>Success!</h1>
            <p>
              <Link to='/'>Sign In</Link>
            </p>
          </div>
          )
        : (
          <div>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <span className={validName ? 'valid' : 'hide'}>
                  <FaCheck />
                </span>
                <span className={validName || !user ? 'hide' : 'invalid'}>
                  <FaTimes />
                </span>
              </label>
              <input
          type="text"
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={e => setUser(e.target.value)}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
              <p className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor="password">
                Password:
                <span className={validPwd ? 'valid' : 'hide'}>
                  <FaCheck />
                </span>
                <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                  <FaTimes />
                </span>
              </label>
              <input
          type="password"
          id='password'
          onChange={e => setPwd(e.target.value)}
          required
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
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

              <label htmlFor="confirmpwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                  <FaCheck />
                </span>
                <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                  <FaTimes />
                </span>
              </label>
              <input
          type="password"
          id='confirmpwd'
          onChange={e => setMatchPwd(e.target.value)}
          required
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
              <p className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                Must match the first password input field.
              </p>

              <button disabled={!!(!validName || !validPwd || !validMatch)}>Sign Up</button>
            </form>
            <p>
              Already Registered? <br/>
              <span>
                <Link to='/'>Sign In</Link>
              </span>
            </p>
          </div>
          )}
    </>
  );
};

export default Register;

import React, { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

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

  return (
    <div>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <h1>Register</h1>
      <form>
        <label htmlFor="firstName">
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
      </form>
    </div>
  );
};

export default Register;

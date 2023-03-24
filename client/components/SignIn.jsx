import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';

const SignIn = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          <div>
            <h1 />
          </div>
          )}
    </div>
  );
};

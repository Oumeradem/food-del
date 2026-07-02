import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({ name: '', email: '', password: '' });

  // Dynamically update the field that changed by its name attribute
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    // Point to login or register endpoint based on current state
    const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';
    const response = await axios.post(`${url}${endpoint}`, data);

    if (response.data.success) {
      // Persist token to localStorage so session survives page refresh
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  const isLogin = currState === 'Login';

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>

        {/* Header: title and close button */}
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='Close'
          />
        </div>

        {/* Inputs: name only shown on Sign Up */}
        <div className='login-popup-inputs'>
          {!isLogin && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>

        <button type='submit'>{isLogin ? 'Login' : 'Create account'}</button>

        {/* Terms agreement checkbox */}
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Toggle between Login and Sign Up */}
        {isLogin
          ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        }

      </form>
    </div>
  );
};

export default LoginPopup;
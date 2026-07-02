import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>

        {/* Brand column: logo, tagline, social links */}
        <div className='footer-content-left'>
          <img src={assets.logo} alt='Tomato logo' />
          <p>
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='Facebook' />
            <img src={assets.twitter_icon} alt='Twitter' />
            <img src={assets.linkedin_icon} alt='LinkedIn' />
          </div>
        </div>

        {/* Site navigation links */}
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact information */}
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-206-844-1776</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className='footer-copyright'>
        Copyright 2026 Tomato.com — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
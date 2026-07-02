import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>
        For Better Experience Download <br /> Tomato App
      </p>

      {/* Platform badges linking to app stores */}
      <div className='app-download-platforms'>
        <img src={assets.play_store} alt='Download on Play Store' />
        <img src={assets.app_store} alt='Download on App Store' />
      </div>
    </div>
  );
};

export default AppDownload;
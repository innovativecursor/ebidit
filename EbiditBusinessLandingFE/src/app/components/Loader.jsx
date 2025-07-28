'use client';

import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import elogo from '../EnquiryForm/images/e-bid_app_1_red.png'

const Loader = ({ fullscreen = true, text = 'Loading...' }) => {
  return (
    <div
      className={`${
        fullscreen ? 'h-screen' : 'h-full'
      } w-full flex flex-col items-center justify-center bg-white z-50`}
    >
      <Image
        src={elogo} 
        alt="Ebidit Logo"
        width={80}
        height={80}
        className="animate-bounce"
      />
      <p className="mt-4 text-gray-600 text-lg animate-pulse">{text}</p>
    </div>
  );
};

Loader.propTypes = {
  fullscreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Loader;

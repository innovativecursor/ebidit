//fixed build error
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import elogo from '../EnquiryForm/images/e-bid_app_1_red.png'

const loading = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsFullscreen(window.innerHeight === screen.height);
    }
  }, []);

  return (
    <div
      className={`${
        isFullscreen ? 'h-screen' : 'h-full'
      } w-full flex flex-col items-center justify-center bg-white z-50`}
    >
      <Image
        src="/e-bid_app_1_red.png"
        alt="Ebidit Logo"
        width={80}
        height={80}
        className="animate-bounce"
      />
      <p className="mt-4 text-gray-600 text-lg animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default loading;

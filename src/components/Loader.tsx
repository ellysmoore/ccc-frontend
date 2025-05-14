'use client';

import React from 'react';

const Loader: React.FC<LoaderProps> = ({ size = 'small', strokeColor = '#000000' }) => {
  const big = size === 'big';
  const medium = size === 'medium';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        background: 'transparent',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width={big ? '50px' : medium ? '40px' : '20px'}
      height={big ? '50px' : medium ? '40px' : '20px'}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={strokeColor}
        strokeWidth="5"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export interface LoaderProps {
  size?: 'big' | 'medium' | 'small';
  strokeColor?: string;
}

export { Loader };

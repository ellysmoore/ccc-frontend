import React, { useEffect } from 'react';
import { MessageProps } from '@/types';

const MessageToastCard = ({
  type,
  text,
  handleClose,
}: MessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose?.();
    }, 6000);

    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div
      className={`text-f14 px-[14px] py-[12px] rounded-[5px] border flex items-center justify-between
        ${type === 'success'
          ? 'border-green-400 bg-green-100 text-green-900'
          : 'border-red-400 bg-red-100 text-red-900'}
      `}
    >
      {text}

      <div
        className={`cursor-pointer w-fit h-fit`}
        onClick={handleClose}
        aria-label="Close modal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 md:w-6 h-5 md:h-6"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke={`${type === 'success'
              ? '#0d542b'
              : '#82181a'}`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export { MessageToastCard };

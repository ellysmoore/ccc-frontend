'use client';

import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  size = '20px',
  readOnly = false,
  leftLabel,
  rightLabel,
  containerClassName = '',
}) => {
  const handleToggle: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!readOnly) {
      onToggle(!checked);
    }
  };

  return (
    <div
      className={`flex items-center gap-[8px] text-sm font-medium text-gray-700 cursor-pointer ${containerClassName}`}
      onClick={handleToggle}
    >
      {leftLabel}

      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`min-w-[${size}] ${readOnly ? 'cursor-not-allowed' : ''}`}
      >
        {checked ? (
          <>
            <path
              d="M0 6C0 2.68629 2.68629 0 6 0H14C17.3137 0 20 2.68629 20 6V14C20 17.3137 17.3137 20 14 20H6C2.68629 20 0 17.3137 0 14V6Z"
              fill="#e17964"
            />
            <path
              d="M14.6666 6.5L8.24992 12.9167L5.33325 10"
              stroke="white"
              fill="transparent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <path
            d="M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H14C17.0376 0.5 19.5 2.96243 19.5 6V14C19.5 17.0376 17.0376 19.5 14 19.5H6C2.96243 19.5 0.5 17.0376 0.5 14V6Z"
            stroke="#D0D5DD"
            fill="transparent"
          />
        )}
      </svg>

      {rightLabel}
    </div>
  );
};

export interface CheckboxProps {
  checked: boolean;
  onToggle: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
  size?: string;
  readOnly?: boolean;
  rightLabel?: React.ReactNode;
  leftLabel?: React.ReactNode;
  containerClassName?: string;
}
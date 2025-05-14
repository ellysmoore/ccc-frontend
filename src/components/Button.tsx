'use client';

import React, { MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { Loader } from './Loader';
import Link from 'next/link';

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  leftIcon,
  rightIcon,
  onClick,
  id,
  download,
  disabled,
  href,
  loading,
  variant = 'default',
  containerClassName = '',
  labelClassName = '',
}) => {
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  const buttonStyle = `w-full cursor-pointer relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-full transition-all
    ${
      disabled
        ? 'bg-gray-200 text-gray-400'
        : variant === 'muted'
          ? 'bg-gray-200 text-gray-700'
          : variant === 'outlined'
            ? 'border border-gray-300 text-gray-700'
            : variant === 'danger'
              ? 'bg-red-500 text-white'
              : variant === 'dashed'
                ? 'border-[1.5px] border-dashed border-gray-300 text-gray-700'
                : 'bg-[#FF6300] text-white'
    }
    ${containerClassName}
  `;

  return href ? (
    <Link download={download} href={href} className={buttonStyle}>
      {leftIcon}
      {label && (
        <div className={`whitespace-nowrap font-[600] text-f16 ${labelClassName}`}>{label}</div>
      )}
      {rightIcon}
    </Link>
  ) : (
    <button
      type={type}
      onClick={handleButtonClick}
      id={id}
      disabled={disabled || loading}
      className={buttonStyle}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {leftIcon}
          {label && (
            <div className={`whitespace-nowrap font-[600] text-f16 ${labelClassName}`}>{label}</div>
          )}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export interface ButtonProps {
  label?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  id?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  disabled?: boolean;
  download?: boolean;
  loading?: boolean;
  href?: string;
  variant?: 'default' | 'outlined' | 'muted' | 'danger' | 'dashed';
  containerClassName?: string;
  labelClassName?: string;
}

export { Button };

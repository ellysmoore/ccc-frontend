'use client';

import React, {
  ChangeEvent,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  MouseEvent,
} from 'react';
import { RiEyeOffLine } from 'react-icons/ri';

const InputElement: React.FC<InputElementProps> = ({
  placeholder = 'Enter value',
  required,
  label,
  type = 'text',
  maxLength = 100,
  name,
  autoComplete,
  leftIcon,
  rightIcon,
  disabled,
  onChangeEvent,
  autoFocus,
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  invalid,
  inputClassName = '',
  value,
  onChangeValue,
  hint = '',
  readOnly,
  inputMode = 'text',
  onClick,
  step,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPassShown, setIsPassShown] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.length <= maxLength) {
      if (onChangeValue) onChangeValue(e.target.value);
      if (onChangeEvent) onChangeEvent(e);
    }
  };

  return (
    <section className={`relative w-full flex flex-col ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-[#0D0D12] mb-[6px] text-f14 font-[500] ${labelClassName}`}
        >
          {label}
          {!required && <span>&#160;Optional</span>}
        </label>
      )}

      <label
        htmlFor={name}
        className={`cursor-text relative border flex items-center justify-between w-full
          rounded-full gap-[8px] px-[14px]
          ${disabled ? 'bg-[#f9fafb]' : 'bg-white'}
          ${isFocused ? 'border-orange-600' : invalid ? 'border-[#d92d20]' : 'border-[#d0d5dd]'}
          ${fieldClassName}
        `}
      >
        {leftIcon}

        <input
          id={name}
          placeholder={placeholder}
          required={required}
          type={type ? (!isPassShown ? 'text' : type) : 'text'}
          inputMode={inputMode}
          maxLength={maxLength}
          name={name}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => handleChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete || 'nope'}
          disabled={disabled}
          readOnly={readOnly}
          step={step}
          onClick={onClick}
          className={`text-base w-full placeholder:text-[#667085] border-none 
            h-full py-[13.5px] outline-none bg-transparent
            ${disabled ? 'text-[#667085]' : 'text-[#222]'}
            ${inputClassName}
          `}
        />

        {type == 'password' && (
          <div
            className="text-[#667085] text-base cursor-pointer"
            onClick={() => setIsPassShown((prev) => !prev)}
          >
            {isPassShown ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00004 2C11.5948 2 14.5854 4.58651 15.2124 8C14.5854 11.4135 11.5948 14 8.00004 14C4.40525 14 1.4146 11.4135 0.787598 8C1.4146 4.58651 4.40525 2 8.00004 2ZM8.00004 12.6667C10.8238 12.6667 13.24 10.7013 13.8516 8C13.24 5.29869 10.8238 3.33333 8.00004 3.33333C5.17624 3.33333 2.75998 5.29869 2.14836 8C2.75998 10.7013 5.17624 12.6667 8.00004 12.6667ZM8.00004 11C6.34316 11 5.00001 9.65687 5.00001 8C5.00001 6.34315 6.34316 5 8.00004 5C9.65684 5 11 6.34315 11 8C11 9.65687 9.65684 11 8.00004 11ZM8.00004 9.66667C8.92051 9.66667 9.66671 8.92047 9.66671 8C9.66671 7.07953 8.92051 6.33333 8.00004 6.33333C7.07957 6.33333 6.33334 7.07953 6.33334 8C6.33334 8.92047 7.07957 9.66667 8.00004 9.66667Z"
                  fill="#6a7282"
                />
              </svg>
            ) : (
              <RiEyeOffLine size={16} className="text-[#667085] " />
            )}
          </div>
        )}

        {rightIcon}
      </label>

      {hint && (
        <div
          className={`text-sm flex items-center mt-[6px] ${
            invalid ? 'text-[#d92d20]' : 'text-[#667085]'
          }`}
        >
          {hint}
        </div>
      )}
    </section>
  );
};

export interface InputElementProps {
  placeholder?: string;
  required?: boolean;
  label?: ReactNode;
  type?: string;
  maxLength?: number;
  name?: string;
  autoComplete?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  onChangeEvent?: (value: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  invalid?: boolean;
  inputClassName?: string;
  value: string;
  onChangeValue?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  hint?: string;
  readOnly?: boolean;
  inputMode?: 'text' | 'search' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  step?: string;
}

export { InputElement };

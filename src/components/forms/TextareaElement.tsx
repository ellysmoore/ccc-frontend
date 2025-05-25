'use client';

import React, { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from 'react';

const TextareaElement: React.FC<TextareaElementProps> = ({
  placeholder = 'Enter value',
  required,
  label,
  name,
  disabled,
  readOnly,
  autoFocus,
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  invalid,
  value,
  onChangeValue,
  onChangeEvent,
  rows = 6,
  hint,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChangeValue) onChangeValue(e.target.value);
    if (onChangeEvent) onChangeEvent(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const text = textarea.value;
      const newText = text.slice(0, cursorPosition) + '\n' + text.slice(cursorPosition);

      if (onChangeValue) onChangeValue(newText);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
        textarea.scrollTop = textarea.scrollHeight;
      });
    }
  };

  return (
    <section className={`w-full flex flex-col ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-gray-800 mb-[6px] text-sm font-[500] ${labelClassName}`}
        >
          {label}
          {!required && <span>&#160;Optional</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        required={required}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(e) => handleChange(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className={`flex items-center w-full text-base placeholder:text-gray-500 cursor-text
          rounded-[8px] shadow-[0px_1px_2px_0px_#1018280D] border py-[10px] px-[14px] outline-none 
          ${disabled ? 'text-[#667085] bg-gray-300' : 'text-[#222] bg-white'}
          ${isFocused ? 'border-orange-600' : invalid ? 'border-red-600' : 'border-[#d0d5dd]'}
          ${fieldClassName}
        `}
        onKeyDown={handleKeyDown}
      ></textarea>

      {hint && (
        <div
          className={`text-sm flex items-center mt-[6px] ${
            invalid ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {hint}
        </div>
      )}
    </section>
  );
};

export interface TextareaElementProps {
  placeholder?: string;
  required?: boolean;
  label?: ReactNode;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  invalid?: boolean;
  value: string;
  onChangeEvent?: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeValue?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  hint?: string;
  rows?: number;
}

export { TextareaElement };

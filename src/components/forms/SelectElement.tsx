'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '../Loader';
import { motion } from 'framer-motion';
import { OutsideClick } from '../OutsideClick';
import Portal from '../Portal';
import { SelectElementOptions } from './SelectElementOptions';

const SelectElement: React.FC<SelectElementProps> = ({
  placeholder = 'Select',
  required,
  label,
  name,
  leftIcon,
  rightIcon,
  options,
  disabled,
  removeSearchBar,
  optionsEmptyState,
  searchPlaceholder = 'Search',
  customDisplayValue,
  isLoadingOptions,
  wrapperClassName = '',
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  optionsClassName = '',
  isLoadingValue,
  invalid,
  hint,
  optionsPosition = 'down',
  multiple,
  value,
  innerLabel,
  onChange,
  valueClassName = '',
  onLoadMore,
  onSearch,
}) => {
  const [isOptionOpen, setIsOptionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOptionOpen && listRef.current) {
      listRef.current.focus();
    }
  }, [isOptionOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOptionOpen || !options?.length) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex =
          event.key === 'ArrowDown'
            ? (prev + 1) % options.length
            : (prev - 1 + options.length) % options.length;
        return nextIndex;
      });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleSelect(options[focusedIndex]);
    } else if (event.key === 'Tab') {
      setIsOptionsOpen(false);
    }
  };

  const getOptionLabel = (() => {
    // eslint-disable-next-line
    const findLabelInOptions = (options: OptionItemsProps[], value: any): string | null => {
      for (const option of options) {
        if (option.value === value) {
          return option?.altLabel ? `${option.label}:${option.altLabel}` : `${option?.label}`;
        }
        if (option.children && option.children.length > 0) {
          const childLabel = findLabelInOptions(option.children, value);
          if (childLabel) return childLabel;
        }
      }
      return null;
    };

    if (multiple && Array.isArray(value) && value.length >= 1) {
      return value
        .map((item: OptionItemsProps) => findLabelInOptions(options || [], item.value))
        .filter(Boolean)
        .join(', ');
    }

    return options ? findLabelInOptions(options, value) : null;
  })();

  const handleClick = () => {
    if (!disabled) {
      setIsOptionsOpen(!isOptionOpen);
    }
  };

  const handleSelect = (selected: OptionItemsProps) => {
    if (Array.isArray(value) && multiple) {
      onChange?.(
        value.some((item: OptionItemsProps) => item.value === selected.value)
          ? value.filter((item: OptionItemsProps) => item.value !== selected.value)
          : [...value, selected]
      );
    } else {
      onChange?.(selected.value);
      setIsOptionsOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch?.(event.target.value);
    }
  };

  const variants = {
    opacity: { opacity: [0, 1], transition: { duration: 0.2 } },
    slideIn: {
      top: [-350, 0],
      transition: { duration: 0.2, delay: 0.1, ease: [0.1, 0.79, 0.36, 0.96] },
    },
    slideInAndOpacity: {
      top: [350, 0],
      opacity: [0, 1],
      transition: { duration: 0.2, delay: 0.1, ease: [0.1, 0.79, 0.36, 0.96] },
    },
  };

  const optionsElement = (
    <>
      {!removeSearchBar && (
        <div className="sticky top-0 w-full bg-gray-50 rounded-tr-[8px] rounded-tl-[8px] flex items-center px-[14px] py-[10px] gap-[12px] border-b border-gray-100">
          <svg
            className="min-w-[20px]"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke="#667085"
              fill="transparent"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            type="text"
            value={searchQuery}
            autoFocus={true}
            onChange={(e) => handleSearch(e)}
            placeholder={searchPlaceholder || 'Search...'}
            className={
              'bg-gray-50 text-gray-700 placeholder:text-[#667085] w-full text-base border-none py-0 outline-none'
            }
          />
        </div>
      )}

      {isLoadingOptions ? (
        <div className="flex justify-center p-[14px] items-center h-full w-full">
          <Loader size="medium" />
        </div>
      ) : (
        <div className="w-full flex flex-col font-[500] py-[4px] text-base text-gray-700">
          {options && options?.length > 0 ? (
            <>
              {
                options?.map((item: OptionItemsProps, index: number) => (
                  <SelectElementOptions
                    key={index}
                    index={index}
                    item={item}
                    value={value}
                    searchQuery={searchQuery}
                    handleSelect={handleSelect}
                    setFocusedIndex={setFocusedIndex}
                    focusedIndex={focusedIndex}
                  />
                ))
              }

              {onLoadMore && (
                <button
                  onClick={onLoadMore}
                  className="w-full py-3 text-center text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Load More
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col whitespace-nowrap justify-center text-sm gap-3 text-gray-700 p-3 items-center h-full w-full">
              {optionsEmptyState || `No ${name?.replace(/_/g, ' ') || 'data'} at the moment`}
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <OutsideClick
      onOutsideClick={() => setIsOptionsOpen(false)}
      wrapperClassName={`!w-full ${wrapperClassName}`}
      additionalRefs={[listRef]}
    >
      <section
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`relative w-full flex flex-col ${containerClassName}`}
      >
        {label && (
          <label className={`text-gray-800 mb-[6px] text-sm font-[500] ${labelClassName}`}>
            {label}
            {!required && <span>&#160;Optional</span>}
          </label>
        )}

        <div
          ref={dropdownRef}
          onClick={handleClick}
          className={`flex items-center justify-between w-full border
            text-base rounded-full gap-[8px] shadow-[0px_1px_2px_0px_#1018280D] py-[10px] px-[14px] 
            ${disabled ? 'bg-[#f9fafb]' : 'bg-white'}
            ${isOptionOpen ? 'border-orange-600' : invalid ? 'border-red-600' : 'border-[#d0d5dd]'}
            ${fieldClassName}
          `}
        >
          {leftIcon}

          <div
            className={`w-full whitespace-nowrap overflow-x-hidden border-none flex items-center 
            ${disabled ? 'text-[#667085]' : 'text-[#222]'} capitalize outline-none bg-transparent 
            ${valueClassName}
            `}
          >
            {isLoadingValue ? (
              <Loader />
            ) : (
              <>
                {innerLabel && (
                  <div
                    className={`border-none outline-none bg-transparent
                      ${disabled ? 'text-[#667085]' : 'text-gray-700'}
                    `}
                  >
                    {innerLabel}&#160;
                  </div>
                )}

                {customDisplayValue ? (
                  customDisplayValue
                ) : getOptionLabel ? (
                  getOptionLabel?.includes(':') ? (
                    <>
                      {getOptionLabel?.split(':')[0]?.toString()?.replace(/,/g, ', ')}
                      &#160;
                      <span className="text-base font-[400] text-gray-600">
                        {getOptionLabel?.split(':')[1]}
                      </span>
                    </>
                  ) : (
                    getOptionLabel?.toString()?.replace(/,/g, ', ')
                  )
                ) : (
                  <span className="text-[#667085]">{placeholder}</span>
                )}
              </>
            )}
          </div>

          {rightIcon || (
            <svg
              className={`min-w-[20px] cursor-pointer transition-all ${isOptionOpen && 'rotate-180'}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#667085"
                fill="transparent"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {hint && (
          <div
            className={`text-sm flex items-center mt-[6px] ${
              invalid ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {hint}
          </div>
        )}

        {isOptionOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-[#12121233] md:hidden z-[1000] w-full h-screen
              top-0 left-0 bottom-0 right-0 fixed flex flex-col justify-end items-center
            `}
            onClick={handleClick}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
          >
            <motion.div
              variants={variants}
              animate={isOptionOpen ? 'slideInAndOpacity' : { top: 350 }}
              className={`min-h-[90%] max-h-[70vh] relative w-full z-[75] py-[8px]
                rounded-[12px] bg-white shadow-md rounded-tr-[16px] rounded-tl-[16px]
                flex flex-col items-center
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <div onClick={handleClick} className="w-[32px] h-[5px] rounded-[2.5px] bg-gray-500" />
              <div className="w-full py-[10px] px-[16px] font-[600] text-base text-gray-800">
                {placeholder}
              </div>

              <div className="w-full h-full overflow-y-auto ">{optionsElement}</div>
            </motion.div>
          </motion.div>
        )}

        <Portal>
          <ul
            ref={listRef}
            tabIndex={-1}
            className={`bg-white hidden md:block shadow-md rounded-[8px] border-gray-300
              fixed z-[9999] w-full min-w-fit mt-[6px] overflow-y-auto
              ${optionsPosition === 'up' ? 'bottom-[120%]' : 'top-[100%]'}
              ${isOptionOpen ? `max-h-[245px] border` : 'max-h-0 border-0'}
              ${optionsClassName}
            `}
            style={{
              width: `${dropdownRef.current?.offsetWidth}px`,
              top: dropdownRef.current?.getBoundingClientRect().bottom ?? 0,
              left: dropdownRef.current?.getBoundingClientRect().left ?? 0,
            }}
          >
            {optionsElement}
          </ul>
        </Portal>
      </section>
    </OutsideClick>
  );
};

export interface OptionItemsProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  altLabel?: string;
  children?: OptionItemsProps[];
}

export interface SelectElementProps {
  placeholder?: string;
  required?: boolean;
  label?: React.ReactNode;
  name: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  options?: OptionItemsProps[];
  isNested?: boolean;
  disabled?: boolean;
  removeSearchBar?: boolean;
  optionsEmptyState?: React.ReactNode;
  searchPlaceholder?: string;
  customDisplayValue?: React.ReactNode;
  isLoadingOptions?: boolean;
  wrapperClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  optionsClassName?: string;
  isLoadingValue?: boolean;
  invalid?: boolean;
  hint?: string;
  optionsPosition?: 'down' | 'up';
  multiple?: boolean;
  value: string | OptionItemsProps | OptionItemsProps[];
  innerLabel?: React.ReactNode;
  // eslint-disable-next-line
  onChange?: (value: any | string | OptionItemsProps[]) => void;
  valueClassName?: string;
  onLoadMore?: () => void;
  onSearch?: (query: string, isEnterKey?: boolean) => void;
}

export { SelectElement };
'use client';

import React from 'react';
import { OptionItemsProps } from './SelectElement';

const SelectElementOptions: React.FC<SelectElementOptionsProps> = ({
  item,
  index,
  value,
  searchQuery,
  handleSelect,
  setFocusedIndex,
  focusedIndex,
}) => {
  const isSelected = Array.isArray(value)
    ? value.some((selected) => selected.value === item.value)
    : item.value.toLowerCase() === (typeof value == 'string' ? value : value?.value)?.toLowerCase();

  const isVisible = item.label.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <li
      className={`py-2 px-3 font-medium text-base cursor-pointer truncate text-gray-800 hover:bg-gray-200 flex-row items-center justify-between capitalize gap-2
        ${isSelected ? 'bg-gray-100' : ''}
        ${isVisible ? 'flex' : 'hidden'}
        ${focusedIndex === index ? 'bg-gray-100' : ''}
      `}
      onClick={() => handleSelect(item)}
      onMouseEnter={() => setFocusedIndex(index)}
    >
      <div className="truncate flex w-full items-center gap-2">
        {item.icon && <span>{item.icon}</span>}
        <span className="capitalize">{item.label}</span>
        {item.altLabel && <span className="truncate text-sm text-gray-600">{item.altLabel}</span>}
      </div>
    </li>
  );
};

export interface SelectElementOptionsProps {
  item: OptionItemsProps;
  value: string | OptionItemsProps | OptionItemsProps[];
  index: number;
  searchQuery: string;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  handleSelect: (item: OptionItemsProps) => void;
}

export { SelectElementOptions };
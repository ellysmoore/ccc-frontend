"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { updateSearchParams } from "@/utils/searchParams";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { InputElement } from "../forms/InputElement";

export const SearchBar = ({
  placeholder,
  containerClassName,
  name,
  readOnly,
  debounceMs = 300,
  minChars = 2,
  parentContainerStyle,
  onSearch,
  onClear,
  updateUrl = false,
  value = "",
  setValue,
}: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || undefined;
  const [internalValue, setInternalValue] = useState("");

  const searchTerm = setValue ? value : internalValue;
  const setSearchTerm = setValue ? setValue : setInternalValue;

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
   setSearchTerm(searchQuery || '');
  }, [searchQuery])

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= minChars && onSearch) {
        onSearch(term);
      } else if (term.length === 0 && onClear) {
        onClear();
      }
    }, debounceMs),
    [onSearch, onClear, minChars]
  );

  const handleSearchChange = (value: string) => {
    console.log("handleSearchChange", value);
    setSearchTerm(value);

    if (value === "") {
      onClear?.();
    } else {
      debouncedSearch(value);
    }

    if (updateUrl) {
      const url = updateSearchParams("q", value, { refreshPage: true });
      router.replace(url);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <label
      htmlFor={name}
      className={`w-auto ${parentContainerStyle}`}
      onClick={() => {
        searchInputRef.current?.focus();
        return;
      }}
    >
      <InputElement
        placeholder={placeholder || "Search"}
        type={"text"}
        autoComplete="off"
        inputClassName="!py-[12px] !text-f14"
        name={name || "search"}
        readOnly={readOnly}
        fieldClassName="!bg-[#FFF]"
        leftIcon={
          <svg
            className="min-w-[21px] pointer-events-none"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.482 17.5L15.5654 14.5833M17.6487 9.58333C17.6487 13.4954 14.4773 16.6667 10.5653 16.6667C6.65331 16.6667 3.48199 13.4954 3.48199 9.58333C3.48199 5.67132 6.65331 2.5 10.5653 2.5C14.4773 2.5 17.6487 5.67132 17.6487 9.58333Z"
              stroke="#667085"
              fill="transparent"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        containerClassName={`!w-full gap-[6px] ${containerClassName}`}
        value={searchTerm}
        onChangeValue={(value: string) => handleSearchChange(value)}
      />
    </label>
  );
};

export interface SearchBarProps {
  name?: string
  placeholder?: string
  containerClassName?: string;
  parentContainerStyle?: string;
  readOnly?: boolean
  debounceMs?: number;
  minChars?: number;
  onSearch?: (query: string, isEnterKey?: boolean) => void;
  onClear?: () => void;
  updateUrl?: boolean;
  value?: string, // Add this prop to control the value externally
  setValue?: (value: string) => void,
};
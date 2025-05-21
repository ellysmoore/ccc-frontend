'use client';

import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  name,
  onChange,
  value = null,
  allowedFileTypes,
  containerClassName,
  labelClassName,
  uploadClassName,
  maxFileSizeMB = 10,
  hint,
  allowAllFileTypes = false,
  required,
  uploadContainerClassName,
}) => {
  const defaultFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'text/csv',
    'text/plain',
  ];

  const acceptedFileTypes = allowedFileTypes || defaultFileTypes;
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  // const formatFileSize = (bytes: number, decimals = 2) => {
  //   if (bytes === 0) return '0 Bytes';
  //   const k = 1000;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
  // };

  const handleFileSelection = (
    event: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    source: 'input' | 'drop'
  ) => {
    event.preventDefault();
    const files =
      source === 'input'
        ? (event as ChangeEvent<HTMLInputElement>).target.files
        : (event as React.DragEvent).dataTransfer.files;

    if (!files || files.length === 0) return;

    const file = files[0];
    if (!allowAllFileTypes && !acceptedFileTypes.includes(file.type)) {
      toast.error('Invalid file type.');
      return;
    }

    if (file.size > maxFileSizeBytes) {
      toast.error(`File size exceeds ${maxFileSizeMB}MB.`);
      return;
    }

    onChange?.(file);
  };

  const clearFile = () => onChange?.(null);

  return (
    <div className={`w-full flex flex-col ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-gray-800 mb-[6px] text-sm font-medium ${labelClassName}`}
        >
          {label} {!required && <span>Optional</span>}
        </label>
      )}

      <input
        id={name}
        type="file"
        accept={acceptedFileTypes.join(',')}
        className="hidden"
        onChange={(e) => handleFileSelection(e, 'input')}
      />
      <div className={`w-full flex flex-col gap-[6px] ${uploadContainerClassName}`}>
        <div
          className={`border border-gray-200 rounded-full flex text-base gap-[6px] justify-between items-center px-3 ${uploadClassName}`}
        >
          <span className="w-full text-sm truncate">
            {value ? value.name : 'No file selected'}
          </span>

          {value && (
            <svg
              className="cursor-pointer min-w-[14px]"
              onClick={clearFile}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.99992 13.6693C3.31802 13.6693 0.333252 10.6845 0.333252 7.0026C0.333252 3.3207 3.31802 0.335938 6.99992 0.335938C10.6818 0.335938 13.6666 3.3207 13.6666 7.0026C13.6666 10.6845 10.6818 13.6693 6.99992 13.6693ZM6.99992 6.0598L5.1143 4.17418L4.17149 5.11698L6.05712 7.0026L4.17149 8.8882L5.1143 9.831L6.99992 7.9454L8.88552 9.831L9.82832 8.8882L7.94272 7.0026L9.82832 5.11698L8.88552 4.17418L6.99992 6.0598Z"
                fill="#98A2B3"
              />
            </svg>
          )}

          <label
            htmlFor={name}
            className="cursor-pointer border-l border-gray-300 whitespace-nowrap py-[10px] px-[10px] text-base text-gray-800 min-w-fit"
          >
            Select media
          </label>
        </div>
        {hint && <div className="w-full text-sm text-gray-500">{hint}</div>}
      </div>
    </div>
  );
};

export type FileType =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/png'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/pdf'
  | 'text/csv'
  | 'text/plain';

export interface FileUploaderProps {
  label?: React.ReactNode;
  name: string;
  onChange?: (value?: File | null) => void;
  value: null | File;
  allowedFileTypes?: string[];
  containerClassName?: string;
  labelClassName?: string;
  uploadClassName?: string;
  maxFileSizeMB?: number;
  isLoading?: boolean;
  hint?: string;
  allowAllFileTypes?: boolean;
  required?: boolean;
  uploadContainerClassName?: string;
}

export { FileUploader };

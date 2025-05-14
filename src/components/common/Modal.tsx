'use client';

import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  title,
  titleClassName,
  fullScreenMobile,
  backdropClassName,
  showCloseIcon = true,
  contentClassName,
  description,
  maxHeight,
  modalClassName,
}) => {
  const max_height = maxHeight ?? 'max-h-[92vh]';

  return (
    <AnimatePresence>
      <motion.div
        className={`bg-[#0C111D80] z-[1000] w-full py-6 px-4 h-screen
          top-0 left-0 bottom-0 right-0 fixed flex justify-center items-center
          ${fullScreenMobile && '!py-0 !px-0'}
          ${backdropClassName}
        `}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, transition: { delay: 0.2 } }}
      >
        {/* MODAL BOX */}
        <motion.div
          className={`block relative w-full md:w-[512px] overflow-hidden
            rounded-xl bg-white shadow-lg z-[1100] border border-gray-200
            ${
              fullScreenMobile &&
              'md:!rounded-xl !rounded-none md:!min-h-0 !min-h-screen md:!w-[512px] !w-full'
            }
            ${max_height}
            ${modalClassName}
          `}
          onClick={(e) => e.stopPropagation()}
          layout
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: { duration: 0.2, type: 'spring', stiffness: 700, damping: 30 },
          }}
          exit={{ scale: 0, transition: { delay: 0.2 } }}
        >
          <div
            className={`bg-white flex w-full ${max_height} ${
              fullScreenMobile && 'md:!min-h-0 !min-h-screen'
            }`}
          >
            {/* MODAL CONTENT AREA */}
            <div
              className={`w-full flex bg-white relative flex-col
                ${title && 'pt-[45px] md:pt-[65px]'}
                ${max_height}
                ${fullScreenMobile && 'md:!min-h-0 !min-h-screen'}
              `}
            >
              {/* MODAL HEADER */}
              {(title || fullScreenMobile) && (
                <div className="w-full p-4 !pb-3.5 bg-white absolute top-0 md:p-6 md:!pb-5 flex items-center justify-between">
                  <div
                    className={`w-full flex flex-col
                    ${fullScreenMobile && '!hidden md:!flex'}
                  `}
                  >
                    <div
                      className={`uppercase font-semibold text-base text-gray-800
                      ${titleClassName}
                    `}
                    >
                      {title}
                    </div>

                    {description && (
                      <div className="text-sm text-gray-500 w-full">{description}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    {showCloseIcon && (
                      <div
                        className="cursor-pointer w-fit h-fit"
                        onClick={onClose}
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
                            stroke="#98A2B3"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODAL BODY */}
              <div className={`flex flex-col w-full h-full overflow-y-auto ${contentClassName}`}>
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: ReactNode;
  description?: string;
  titleClassName?: string;
  modalClassName?: string;
  fullScreenMobile?: boolean;
  backdropClassName?: string;
  maxHeight?: string;
  contentStyles?: string;
  contentClassName?: string;
  isExpandable?: boolean;
  onExpandToggle?: () => void;
  showCloseIcon?: boolean;
}
export { Modal };

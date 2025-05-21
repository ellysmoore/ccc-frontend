'use client';
import { RefObject, useRef, useEffect } from 'react';

// eslint-disable-next-line
export const useOutsideClickHandler = (refs: RefObject<any>[], effect: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );
      if (clickedOutside) {
        effect();
      }
    }

    document.addEventListener('mousedown', (event) => {
      handleClickOutside(event);
    });
    return () => {
      document.removeEventListener('mousedown', (event) => {
        handleClickOutside(event);
      });
    };
  }, [refs, effect]);
};

export const OutsideClick: React.FC<OustsideClickProps> = ({
  children,
  onOutsideClick,
  wrapperClassName,
  wrapperStyle,
  additionalRefs = [],
}) => {
  const wrapperRef = useRef(null);
  useOutsideClickHandler([wrapperRef, ...additionalRefs], onOutsideClick);

  return (
    <div className={`w-full ${wrapperClassName}`} ref={wrapperRef} style={wrapperStyle}>
      {children}
    </div>
  );
};

export interface OustsideClickProps {
  children: React.ReactNode;
  onOutsideClick: () => void;
  wrapperClassName?: string;
  // eslint-disable-next-line
  wrapperStyle?: any;
  // eslint-disable-next-line
  additionalRefs?: RefObject<any>[];
}

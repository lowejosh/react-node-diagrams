import { useEffect, RefObject } from 'react';

/**
 *  Calls a given function when a click is made outside a given ref
 */
export const useOutsideClick = (ref: RefObject<HTMLDivElement>, handleClickOutside: Function) => {
  function handleClickOutsideWrapper(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Element)) {
      handleClickOutside(event.target);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideWrapper);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideWrapper);
    };
  });
};

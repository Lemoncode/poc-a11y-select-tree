import React from 'react';

export const useClickOutside = (
  isOpen: boolean,
  callback: (e: MouseEvent) => void
) => {
  const handleClickOutside = (e: MouseEvent) => {
    callback(e);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
};

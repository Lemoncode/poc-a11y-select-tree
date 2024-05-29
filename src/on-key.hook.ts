import React from "react";

export const useOnKey = (
  keys: string[],
  callback: (e: KeyboardEvent) => void
) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callback(e);
      }
    };

    // TODO: attach event to some element provided by params
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys]);
};

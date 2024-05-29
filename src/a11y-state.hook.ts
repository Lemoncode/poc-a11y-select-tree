import React from "react";
import { getArrowDownIndex, getArrowUpIndex } from "./focus.helpers";
import { useOnKey } from "./on-key.hook";

type A11yOption<Option> = Option & {
  tabIndex: number;
};

export const useA11ySelect = <Option>(
  options: Option[],
  getInitialSelected: (option: Option, index: number) => boolean
) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [list, setList] = React.useState<A11yOption<Option>[]>(
    options.map((option, index) => ({
      ...option,
      tabIndex: getInitialSelected(option, index) ? 0 : -1,
    }))
  );

  const handleFocus = (event: KeyboardEvent) => {
    const currentIndex = list.findIndex((option) => option.tabIndex === 0);
    const nextIndex =
      event.key === "ArrowUp"
        ? getArrowUpIndex(currentIndex, list)
        : getArrowDownIndex(currentIndex, list);

    setList((prevOptions) =>
      prevOptions.map((option, index) => {
        switch (index) {
          case currentIndex:
            return {
              ...option,
              tabIndex: -1,
            };
          case nextIndex:
            return {
              ...option,
              tabIndex: 0,
            };
          default:
            return option;
        }
      })
    );
  };

  useOnKey(["Escape", "Tab"], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      // Reset tabIndex with selected option
      setIsOpen(false);
    }
  });

  useOnKey(["ArrowDown", "ArrowUp"], (event: KeyboardEvent) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    handleFocus(event);
  });

  const handleFocusOption = (option: A11yOption<Option>) => (element: any) => {
    if (isOpen && option.tabIndex === 0) {
      element?.focus();
    }
  };

  return {
    isOpen,
    setIsOpen,
    list: list,
    setList: setList,
    onFocusOption: handleFocusOption,
  };
};

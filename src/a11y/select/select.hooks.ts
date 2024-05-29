import React from 'react';
import { getArrowDownIndex, getArrowUpIndex } from '../focus.common-helpers';
import { useOnKey } from '../on-key.hook';
import { A11ySelectOption } from './select.model';
import { getFocusedOption, updateFocusBySelectedOption } from './focus.helpers';

export const useA11ySelect = <Option>(
  options: Option[],
  getOptionId: <Key extends keyof Option>(option: Option) => Option[Key],
  listRef: React.RefObject<HTMLElement>,
  buttonRef: React.RefObject<HTMLButtonElement>
) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<
    A11ySelectOption<Option> | undefined
  >(undefined);

  const [list, setList] = React.useState<A11ySelectOption<Option>[]>(
    updateFocusBySelectedOption(options, getOptionId, selectedOption)
  );

  const handleSetSelectedOption = (
    selectedOptionId: ReturnType<typeof getOptionId>
  ) => {
    buttonRef.current?.focus();
    setIsOpen(false);
    const selectedOption = list.find(
      option => getOptionId(option) === selectedOptionId
    );
    setSelectedOption(selectedOption);
    setList(updateFocusBySelectedOption(options, getOptionId, selectedOption));
  };

  const handleFocus = (event: KeyboardEvent) => {
    const currentIndex = list.findIndex(option => option.tabIndex === 0);
    const nextIndex =
      event.key === 'ArrowUp'
        ? getArrowUpIndex(currentIndex, list)
        : getArrowDownIndex(currentIndex, list);

    setList(prevOptions =>
      prevOptions.map((option, index) => {
        switch (index) {
          case currentIndex:
            return {
              ...option,
              tabIndex: -1
            };
          case nextIndex:
            return {
              ...option,
              tabIndex: 0
            };
          default:
            return option;
        }
      })
    );
  };

  useOnKey(listRef, ['ArrowDown', 'ArrowUp'], (event: KeyboardEvent) => {
    handleFocus(event);
  });

  useOnKey(buttonRef, ['ArrowDown', 'ArrowUp'], () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  });

  useOnKey(buttonRef, ['Escape', 'Tab'], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      if (selectedOption) {
        const id = getOptionId(selectedOption);
        handleSetSelectedOption(id);
      }
    }
  });

  useOnKey(buttonRef, [' ', 'Enter'], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      const focusedOption = getFocusedOption(list);
      if (focusedOption && focusedOption.isSelectable) {
        const id = getOptionId(focusedOption);
        handleSetSelectedOption(id);
      }
    }
  });

  const handleFocusOption =
    (option: A11ySelectOption<Option>) => (element: any) => {
      if (isOpen && option.tabIndex === 0) {
        element?.focus();
      }
    };

  return {
    isOpen,
    setIsOpen,
    list,
    setList,
    selectedOption,
    setSelectedOption: handleSetSelectedOption,
    onFocusOption: handleFocusOption
  };
};

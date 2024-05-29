import React from 'react';
import { getArrowDownIndex, getArrowUpIndex } from '../focus.common-helpers';
import { useOnKey } from '../on-key.hook';
import { A11ySelectOption } from './select.model';
import { getFocusedOption, updateFocusBySelectedOption } from './focus.helpers';

export const useA11ySelect = <Option>(
  options: Option[],
  getOptionId: <Key extends keyof Option>(option: Option) => Option[Key],
  optionsContainerRef: React.RefObject<HTMLElement>,
  buttonRef: React.RefObject<HTMLButtonElement>
) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<
    A11ySelectOption<Option> | undefined
  >(undefined);

  const [optionList, setOptionList] = React.useState<
    A11ySelectOption<Option>[]
  >(updateFocusBySelectedOption(options, getOptionId, selectedOption));

  const handleSetSelectedOption = (
    selectedOptionId: ReturnType<typeof getOptionId>
  ) => {
    buttonRef.current?.focus();
    setIsOpen(false);
    const selectedOption = optionList.find(
      option => getOptionId(option) === selectedOptionId
    );
    setSelectedOption(selectedOption);
    setOptionList(
      updateFocusBySelectedOption(options, getOptionId, selectedOption)
    );
  };

  const handleFocus = (event: KeyboardEvent) => {
    const currentIndex = optionList.findIndex(option => option.tabIndex === 0);
    const nextIndex =
      event.key === 'ArrowUp'
        ? getArrowUpIndex(currentIndex, optionList)
        : getArrowDownIndex(currentIndex, optionList);

    setOptionList(prevOptions =>
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

  useOnKey(
    optionsContainerRef,
    ['ArrowDown', 'ArrowUp'],
    (event: KeyboardEvent) => {
      handleFocus(event);
    }
  );

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
      const focusedOption = getFocusedOption(optionList);
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
    optionList,
    setOptionList,
    selectedOption,
    setSelectedOption: handleSetSelectedOption,
    onFocusOption: handleFocusOption
  };
};

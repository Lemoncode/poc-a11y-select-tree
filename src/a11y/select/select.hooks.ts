import React from 'react';
import { getFocusedOption } from '../focus.common-helpers';
import { useOnKey } from '../on-key.hook';
import { useClickOutside } from '../click-outside.hook';
import { A11ySelectOption } from './select.model';
import { updateFocusBySelectedOption } from './focus.helpers';
import { useA11yList } from '../list';

export const useA11ySelect = <Option>(
  options: Option[],
  getOptionId: <Key extends keyof Option>(option: Option) => Option[Key]
) => {
  const buttonRef = React.useRef<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<
    A11ySelectOption<Option> | undefined
  >(undefined);
  const {
    optionListRef,
    options: internalOptions,
    setOptions,
    onFocusOption
  } = useA11yList(
    options,
    updateFocusBySelectedOption(getOptionId, selectedOption)
  );

  const handleSetSelectedOption = (
    selectedOptionId: ReturnType<typeof getOptionId>
  ) => {
    buttonRef.current?.focus();
    setIsOpen(false);
    const selectedOption = internalOptions.find(
      option => getOptionId(option) === selectedOptionId
    );
    setSelectedOption(selectedOption);
    setOptions(
      updateFocusBySelectedOption(getOptionId, selectedOption)(internalOptions)
    );
  };

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
      } else {
        buttonRef.current?.focus();
        setIsOpen(false);
      }
    }
  });

  useOnKey(buttonRef, [' ', 'Enter'], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      const focusedOption = getFocusedOption(internalOptions);
      if (focusedOption && focusedOption.isSelectable) {
        const id = getOptionId(focusedOption);
        handleSetSelectedOption(id);
      }
    }
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useClickOutside(isOpen, handleClickOutside);

  return {
    optionListRef,
    buttonRef,
    isOpen,
    setIsOpen,
    options: internalOptions,
    setOptions,
    selectedOption,
    setSelectedOption: handleSetSelectedOption,
    onFocusOption
  };
};

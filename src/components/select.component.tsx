import React from 'react';
import { useA11ySelect } from '../a11y';

interface Option {
  id: string;
  label: string;
}
interface Props {
  options: string[];
}
export const Select: React.FC<Props> = props => {
  const {
    optionListRef,
    buttonRef,
    isOpen,
    setIsOpen,
    options,
    selectedOption,
    setSelectedOption,
    onFocusOption
  } = useA11ySelect(
    props.options.map<Option>(label => ({ id: label, label })),
    option => option.id
  );

  return (
    <div>
      <p>Custom Select</p>
      <button
        ref={buttonRef}
        type="button"
        aria-controls="listbox1"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="combo1-label"
        id="combo1"
        role="combobox"
        tabIndex={0}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedOption ? selectedOption.label : 'Select an option'}
        {isOpen && (
          <ul
            id="listbox1"
            role="listbox"
            aria-labelledby="combo1-label"
            tabIndex={-1}
            ref={optionListRef}
          >
            {options.map(option => (
              <li
                key={option.id}
                role="option"
                tabIndex={option.tabIndex}
                aria-selected={selectedOption?.id === option.id}
                onClick={() => {
                  setSelectedOption(option.id);
                }}
                ref={onFocusOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
};

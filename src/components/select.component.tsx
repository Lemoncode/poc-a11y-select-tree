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
    veilRef,
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
      <p id="combo1-label">Custom Select</p>
      <button
        ref={buttonRef}
        type="button"
        aria-controls="listbox1"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="combo1-label"
        aria-activedescendant={selectedOption?.id}
        id="combo1"
        role="combobox"
        tabIndex={0}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedOption ? selectedOption.label : 'Select an option'}
        {isOpen && (
          <>
            <div ref={veilRef} className="veil"></div>
            <ul
              id="listbox1"
              role="listbox"
              aria-labelledby="combo1-label"
              tabIndex={-1}
              ref={optionListRef}
              className="options-list"
              onClick={e => e.stopPropagation()}
            >
              {options.map(option => (
                <li
                  key={option.id}
                  id={option.id}
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
          </>
        )}
      </button>
    </div>
  );
};

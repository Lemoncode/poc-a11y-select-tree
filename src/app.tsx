import React from "react";
import { useOnKey } from "./on-key.hook";
import { useA11ySelect } from "./a11y-state.hook";

interface Option {
  id: string;
  label: string;
}

const OPTION_LABELS = [
  "weather",
  "salsa recipes",
  "cheap flights to NY",
  "dictionary",
  "baseball scores",
  "hotels in NY",
  "mortgage calculator",
  "restaurants near me",
  "free games",
  "gas prices",
  "classical music",
];

export const App = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const getInitialSelected = (_: Option, index: number) => index === 0;
  const {
    isOpen,
    setIsOpen,
    list,
    onFocusOption: onOptionFocus,
  } = useA11ySelect(
    OPTION_LABELS.map<Option>((label) => ({ id: label, label })),
    getInitialSelected
  );

  const handleSelectOption = (id: string) => {
    setSelectedOption(id);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  useOnKey([" ", "Enter"], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      const focusedOption = list.find((option) => option.tabIndex === 0);
      if (focusedOption) {
        handleSelectOption(focusedOption.id);
      }
    }
  });

  return (
    <div className="container">
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
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption : "Select an option"}
          <ul
            id="listbox1"
            role="listbox"
            aria-labelledby="combo1-label"
            tabIndex={-1}
            style={{ display: isOpen ? "block" : "none" }}
          >
            {list.map((option) => (
              <li
                key={option.id}
                role="option"
                tabIndex={option.tabIndex}
                aria-selected={selectedOption === option.id}
                onClick={() => handleSelectOption(option.id)}
                ref={onOptionFocus(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </button>
      </div>
      <div>
        <p>Real select</p>
        <select>
          <option id="lb2-01">weather</option>
          <option id="lb2-02">salsa recipes</option>
          <option id="lb2-03">cheap flights to NY</option>
          <option id="lb2-04">dictionary</option>
          <option id="lb2-05">baseball scores</option>
          <option id="lb2-06">hotels in NY</option>
        </select>
      </div>
    </div>
  );
};

import React from 'react';

export const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const listbox1 = React.useRef<HTMLUListElement>(null);
  const combobox1 = React.useRef<HTMLButtonElement>(null);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (isOpen && e.key === 'Escape') ||
        (isOpen && e.key === 'Tab') ||
        (isOpen && e.key === ' ') ||
        (isOpen && e.key === 'Enter')
      ) {
        e.preventDefault();

        setIsOpen(false);
        if (combobox1.current) {
          combobox1.current.focus();
        }

        const selectedOption = listbox1.current?.querySelector(
          '[aria-selected="true"]'
        );

        if (selectedOption && selectedOption instanceof HTMLLIElement) {
          setSelectedOption(selectedOption.textContent);
        }
      }

      if (
        (e.key === 'ArrowDown' &&
          !isOpen &&
          document.activeElement === combobox1.current) ||
        (e.key === 'ArrowUp' &&
          !isOpen &&
          document.activeElement === combobox1.current)
      ) {
        setIsOpen(true);
      }

      if (e.key === 'ArrowDown') {
        const listbox = listbox1.current;
        if (listbox) {
          const options = listbox.querySelectorAll('li');

          const selectedOption = listbox.querySelector(
            '[aria-selected="true"]'
          );

          if (selectedOption && selectedOption instanceof HTMLLIElement) {
            const index = Array.from(options).indexOf(selectedOption);
            if (index < options.length - 1) {
              options[index].setAttribute('aria-selected', 'false');
              options[index].tabIndex = -1;
              options[index + 1].focus();
              options[index + 1].setAttribute('aria-selected', 'true');
              options[index + 1].tabIndex = 0;
            }
          }
        }
      }
      if (e.key === 'ArrowUp') {
        const listbox = listbox1.current;
        if (listbox) {
          const options = listbox.querySelectorAll('li');
          const selectedOption = listbox.querySelector(
            '[aria-selected="true"]'
          );
          if (selectedOption && selectedOption instanceof HTMLLIElement) {
            const index = Array.from(options).indexOf(selectedOption);
            if (index > 0) {
              options[index].setAttribute('aria-selected', 'false');
              options[index].tabIndex = -1;
              options[index - 1].focus();
              options[index - 1].setAttribute('aria-selected', 'true');
              options[index - 1].tabIndex = 0;
            }
          }
        }
      }
    };

    if (isOpen) {
      const listbox = listbox1.current;
      if (listbox) {
        const selectedOption = listbox.querySelector('[aria-selected="true"]');

        if (selectedOption && selectedOption instanceof HTMLLIElement) {
          selectedOption.focus();
        } else {
          const options = listbox.querySelectorAll('li');
          options.forEach(option => {
            option.setAttribute('aria-selected', 'false');
            option.tabIndex = -1;
          });

          options[0].focus();
          options[0].setAttribute('aria-selected', 'true');
          options[0].tabIndex = 0;
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  return (
    <div className="container">
      <div>
        <p>Custom Select</p>
        <button
          ref={combobox1}
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
          {selectedOption ? selectedOption : 'Select an option'}
          <ul
            id="listbox1"
            role="listbox"
            ref={listbox1}
            aria-labelledby="combo1-label"
            tabIndex={-1}
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <li id="lb1-01" role="option">
              weather
            </li>
            <li id="lb1-02" role="option">
              salsa recipes
            </li>
            <li id="lb1-03" role="option">
              cheap flights to NY
            </li>
            <li id="lb1-04" role="option">
              dictionary
            </li>
            <li id="lb1-05" role="option">
              baseball scores
            </li>
            <li id="lb1-06" role="option">
              hotels in NY
            </li>
            <li id="lb1-07" role="option">
              mortgage calculator
            </li>
            <li id="lb1-08" role="option">
              restaurants near me
            </li>
            <li id="lb1-09" role="option">
              free games
            </li>
            <li id="lb1-10" role="option">
              gas prices
            </li>
            <li id="lb1-11" role="option">
              classical music
            </li>
          </ul>
        </button>
      </div>
      <div>
        <p>Real select</p>
        <select>
          <option id="lb2-01">weather</option>
          <option id="lb2-02" role="option">
            salsa recipes
          </option>
          <option id="lb2-03" role="option">
            cheap flights to NY
          </option>
          <option id="lb2-04" role="option">
            dictionary
          </option>
          <option id="lb2-05" role="option">
            baseball scores
          </option>
          <option id="lb2-06" role="option">
            hotels in NY
          </option>
        </select>
      </div>
    </div>
  );
};

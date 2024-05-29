import React from 'react';
import { TreeOption } from '../app';
import { ChildrenList } from './childrenList.component';
import { useA11yTree } from '../a11y';

interface Props {
  options: TreeOption[];
}

export const CustomTreeSelect: React.FC<Props> = prop => {
  const { options } = prop;

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const optionsContainerRef = React.useRef<HTMLUListElement>(null);

  const {
    optionList,
    isOpen,
    setIsOpen,
    onFocusOption,
    selectedOption,
    setSelectedOption,
    selectedPath
  } = useA11yTree(options, option => option.id, optionsContainerRef, buttonRef);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setSelectedOption('lb23-01');
  //   }, 2000);
  // }, []);

  return (
    <div>
      <p>Custom Tree Select</p>
      <button
        type="button"
        aria-controls="listbox1"
        aria-expanded={isOpen}
        aria-haspopup="tree"
        aria-labelledby="combo2-label"
        id="combo2"
        role="combobox"
        tabIndex={0}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedPath : 'Select an option'}
        <ul
          id="listbox1"
          role="tree"
          aria-labelledby="combo1-label"
          tabIndex={-1}
          style={{ display: isOpen ? 'block' : 'none' }}
          ref={optionsContainerRef}
        >
          {optionList.map(option => {
            return option.children ? (
              <ChildrenList
                handleSelectOption={setSelectedOption}
                option={option}
                selectedOption={selectedOption}
                onFocusOption={onFocusOption}
                key={option.id}
              ></ChildrenList>
            ) : (
              <li
                key={option.id}
                role="treeitem"
                tabIndex={option.tabIndex}
                aria-selected={selectedOption?.label === option.label}
                onClick={() => setSelectedOption(option.id)}
                ref={onFocusOption(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </button>
    </div>
  );
};

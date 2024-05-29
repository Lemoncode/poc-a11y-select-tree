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
  const listRef = React.useRef<HTMLUListElement>(null);

  const {
    list,
    isOpen,
    setIsOpen,
    onFocusOption,
    selectedOption,
    setSelectedOption
  } = useA11yTree(options, option => option.id, listRef, buttonRef);

  React.useEffect(() => {
    setTimeout(() => {
      // list.find(option => option.id === 'lb23-01');
      // const option = changeFocusOption(list, 'lb23-01');
      // console.log(option);
      setSelectedOption('lb23-01');
    }, 2000);
  }, []);

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
        {selectedOption ? selectedOption.label : 'Select an option'}
        <ul
          id="listbox1"
          role="tree"
          aria-labelledby="combo1-label"
          tabIndex={-1}
          style={{ display: isOpen ? 'block' : 'none' }}
          ref={listRef}
        >
          {list.map(option => {
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

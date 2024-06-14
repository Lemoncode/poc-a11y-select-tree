import React from 'react';
import { TreeOption } from '../app';
import {
  A11yNestedListOption,
  useA11yNestedSelect,
  mapNestedSelectOptionsToFlatOptions
} from '../a11y';
import { NestedOptions } from './nested-options.component';

interface Props {
  options: TreeOption[];
  value: string | undefined;
  onChange: (id: string) => void;
}

export const findPath = (
  id: string | undefined,
  optionList: A11yNestedListOption<TreeOption>[]
) => {
  const flatOptions = mapNestedSelectOptionsToFlatOptions(optionList);
  const path: string[] = [];
  let currentId = id;
  while (currentId) {
    const flatOption = flatOptions.find(
      (option: any) => option.id === currentId
    );
    if (flatOption) {
      path.unshift(flatOption.label);
      currentId = flatOption.parentId;
    } else {
      currentId = undefined;
    }
  }
  return path.join(' > ');
};

export const NestedSelect: React.FC<Props> = props => {
  const {
    optionListRef,
    buttonRef,
    veilRef,
    options,
    isOpen,
    setIsOpen,
    onFocusOption,
    selectedOption,
    setSelectedOption
  } = useA11yNestedSelect(
    props.options,
    option => option.id,
    props.onChange,
    props.value
  );

  const selectedPath = findPath(selectedOption?.id, options);

  return (
    <div key={selectedOption?.id}>
      <p id="combo2-label">Custom Tree Select</p>
      <button
        type="button"
        aria-controls="listbox2"
        aria-expanded={isOpen}
        aria-haspopup="tree"
        aria-labelledby="combo2-label"
        aria-activedescendant={selectedOption?.id}
        id="combo2"
        role="combobox"
        tabIndex={0}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedPath : 'Select an option'}
        {isOpen && (
          <>
            <div ref={veilRef} className="veil"></div>
            <ul
              id="listbox2"
              role="tree"
              aria-labelledby="combo2-label"
              tabIndex={-1}
              ref={optionListRef}
              className="options-list"
              onClick={e => e.stopPropagation()}
            >
              {options.map(option => {
                return option.children ? (
                  <NestedOptions
                    handleSelectOption={setSelectedOption}
                    option={option}
                    selectedOption={selectedOption}
                    onFocusOption={onFocusOption}
                    key={option.id}
                  ></NestedOptions>
                ) : (
                  <li
                    key={option.id}
                    id={option.id}
                    role="treeitem"
                    tabIndex={option.tabIndex}
                    aria-selected={selectedOption?.id === option.id}
                    onClick={() => setSelectedOption(option.id)}
                    ref={onFocusOption(option)}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </button>
    </div>
  );
};

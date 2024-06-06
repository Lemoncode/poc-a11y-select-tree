import React from "react";
import { TreeOption } from "../app";
import {
  A11yNestedListOption,
  useA11yNestedSelect,
  mapNestedSelectOptionsToFlatOptions,
} from "../a11y";
import { NestedOptions } from "./nested-options.component";

interface Props {
  options: TreeOption[];
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
  return path.join(" > ");
};

export const NestedSelect: React.FC<Props> = (props) => {
  const {
    optionListRef,
    buttonRef,
    options,
    isOpen,
    setIsOpen,
    onFocusOption,
    selectedOption,
    setSelectedOption,
  } = useA11yNestedSelect(props.options, (option) => option.id);

  const selectedPath = findPath(selectedOption?.id, options);

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
        {selectedOption ? selectedPath : "Select an option"}
        <ul
          id="listbox1"
          role="tree"
          aria-labelledby="combo1-label"
          tabIndex={-1}
          style={{ display: isOpen ? "block" : "none" }}
          ref={optionListRef}
        >
          {options.map((option) => {
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

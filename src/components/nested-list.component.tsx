import React from "react";
import { useA11yNestedList } from "../a11y";
import { TreeOption } from "../app";
import { NestedListItems } from "./nested-list-items.component";

interface Props {
  options: TreeOption[];
}

export const NestedList: React.FC<Props> = (props) => {
  const { optionListRef, options, onFocusOption } = useA11yNestedList(
    props.options
  );

  return (
    <ul id="list3" tabIndex={-1} ref={optionListRef} className="list">
      {options.map((option) => {
        return option.children ? (
          <NestedListItems
            option={option}
            onFocusOption={onFocusOption}
            key={option.id}
          ></NestedListItems>
        ) : (
          <li
            key={option.id}
            tabIndex={option.tabIndex}
            ref={onFocusOption(option)}
          >
            {option.label}
          </li>
        );
      })}
    </ul>
  );
};

import React from 'react';
import { useA11yNestedList } from '../a11y';
import { TreeOption } from '../app';
import { NestedListItems } from './nested-list-items.component';

interface Props {
  options: TreeOption[];
}

export const NestedList: React.FC<Props> = props => {
  const { options } = props;
  const optionsContainerRef = React.useRef<HTMLUListElement>(null);

  const { optionList, onFocusOption } = useA11yNestedList(
    options,
    optionsContainerRef
  );

  return (
    <ul id="list3" tabIndex={-1} ref={optionsContainerRef} className="list">
      {optionList.map(option => {
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

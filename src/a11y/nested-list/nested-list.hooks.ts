import React from 'react';
import { useOnKey } from '../on-key.hook';

import { updateFocusBySelectedOption } from './focus.helpers';
import {
  mapFlatOptionsToOptions,
  mapOptionsToFlatOptions
} from './nested-list.mappers';
import { BaseOption } from '../nested-select';
import { A11yListOption } from './nested-list.model';
import { getArrowDownIndex, getArrowUpIndex } from '../focus.common-helpers';

export const useA11yNestedList = <Option extends BaseOption<Option>>(
  options: Option[],
  optionsContainerRef: React.RefObject<HTMLElement>
) => {
  const flatOptions = mapOptionsToFlatOptions(options);

  const [optionList, setOptionList] = React.useState(
    updateFocusBySelectedOption(flatOptions)
  );

  const updateFocus = (id: Option['id'] | undefined) => {
    if (id) {
      setOptionList(
        optionList.map(option => {
          return {
            ...option,
            tabIndex: option.id === id ? 0 : -1
          };
        })
      );
    }
  };
  const handleFocus = (event: KeyboardEvent) => {
    const currentIndex = optionList.findIndex(option => option.tabIndex === 0);
    const nextIndex =
      event.key === 'ArrowUp'
        ? getArrowUpIndex(currentIndex, optionList)
        : getArrowDownIndex(currentIndex, optionList);

    setOptionList(prevOptions =>
      prevOptions.map((option, index) => {
        switch (index) {
          case currentIndex:
            return {
              ...option,
              tabIndex: -1
            };
          case nextIndex:
            return {
              ...option,
              tabIndex: 0
            };
          default:
            return option;
        }
      })
    );
  };

  useOnKey(
    optionsContainerRef,
    ['ArrowDown', 'ArrowUp'],
    (event: KeyboardEvent) => {
      handleFocus(event);
    }
  );

  useOnKey(optionsContainerRef, ['ArrowRight'], () => {
    //If have childs, Focus on the first child
    const focusedOption = optionList.find(option => option.tabIndex === 0);
    const child = optionList.find(
      option => option.parentId === focusedOption?.id
    );
    updateFocus(child?.id);
  });

  useOnKey(optionsContainerRef, ['ArrowLeft'], () => {
    //If have parent, Focus on the parent
    const focusedOption = optionList.find(option => option.tabIndex === 0);
    const parent = optionList.find(
      option => option.id === focusedOption?.parentId
    );
    updateFocus(parent?.id);
  });

  const handleFocusOption =
    (option: A11yListOption<Option>) => (element: any) => {
      if (option.tabIndex === 0) {
        element?.focus();
      }
    };
  return {
    optionList: mapFlatOptionsToOptions(optionList),
    onFocusOption: handleFocusOption
  };
};

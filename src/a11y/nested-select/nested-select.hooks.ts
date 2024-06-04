import { useA11ySelect } from '../select';
import { useOnKey } from '../on-key.hook';
import { BaseOption, FlatOption } from './nested-select.model';
import {
  mapOptionsToFlatOptions,
  mapFlatOptionsToOptions
} from './nested-select.mappers';
import { findPath } from './nested-select.helpers';

export const useA11yNestedSelect = <Option extends BaseOption<Option>>(
  options: Option[],
  getOptionId: <Key extends keyof FlatOption<Option>>(
    option: FlatOption<Option>
  ) => FlatOption<Option>[Key],
  optionsContainerRef: React.RefObject<HTMLElement>,
  buttonRef: React.RefObject<HTMLButtonElement>
) => {
  const flatOptions = mapOptionsToFlatOptions(options);

  const {
    isOpen,
    setIsOpen,
    optionList,
    setOptionList,
    selectedOption,
    setSelectedOption,
    onFocusOption
  } = useA11ySelect(flatOptions, getOptionId, optionsContainerRef, buttonRef);

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

  //Maybe we don't need this.
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

  return {
    optionList: mapFlatOptionsToOptions(optionList),
    isOpen,
    setIsOpen,
    selectedOption,
    setSelectedOption,
    selectedPath: findPath(selectedOption?.id, optionList),
    onFocusOption
  };
};

import { useA11ySelect } from '../select';
import { useOnKey } from '../on-key.hook';
import { BaseOption, FlatOption } from './tree.model';
import {
  mapOptionsToFlatOptions,
  mapFlatOptionsToOptions
} from './tree.mappers';

export const useA11yTree = <Option extends BaseOption<Option>>(
  options: Option[],
  getOptionId: <Key extends keyof FlatOption<Option>>(
    option: FlatOption<Option>
  ) => FlatOption<Option>[Key],
  listRef: React.RefObject<HTMLElement>,
  buttonRef: React.RefObject<HTMLButtonElement>
) => {
  const flatOptions = mapOptionsToFlatOptions(options);

  const {
    isOpen,
    setIsOpen,
    list,
    setList,
    selectedOption,
    setSelectedOption,
    onFocusOption
  } = useA11ySelect(flatOptions, getOptionId, listRef, buttonRef);

  const updateFocus = (id: Option['id'] | undefined) => {
    if (id) {
      setList(
        list.map(option => {
          return {
            ...option,
            tabIndex: option.id === id ? 0 : -1
          };
        })
      );
    }
  };

  //Maybe we don't need this.
  useOnKey(listRef, ['ArrowRight'], () => {
    //If have childs, Focus on the first child
    const focusedOption = list.find(option => option.tabIndex === 0);
    const child = list.find(option => option.parentId === focusedOption?.id);
    updateFocus(child?.id);
  });

  useOnKey(listRef, ['ArrowLeft'], () => {
    //If have parent, Focus on the parent
    const focusedOption = list.find(option => option.tabIndex === 0);
    const parent = list.find(option => option.id === focusedOption?.parentId);
    updateFocus(parent?.id);
  });

  return {
    list: mapFlatOptionsToOptions(list),
    isOpen,
    setIsOpen,
    selectedOption,
    setSelectedOption,
    onFocusOption
  };
};

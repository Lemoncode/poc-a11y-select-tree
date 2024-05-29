import { A11ySelectOption } from './select.model';

export const getFocusedOption = <Option>(options: A11ySelectOption<Option>[]) =>
  options.find(option => option.tabIndex === 0);

export const updateFocusBySelectedOption = <Option>(
  options: Option[],
  getOptionId: <Key extends keyof Option>(option: Option) => Option[Key],
  selectedOption: Option | undefined
) => {
  const selectedOptionId = Boolean(selectedOption)
    ? getOptionId(selectedOption!)
    : undefined;

  const a11ySelectionOptions = options.map(option => ({
    ...option,
    tabIndex: getOptionId(option) === selectedOptionId ? 0 : -1,
    isSelectable:
      (option as Partial<{ isSelectable: boolean }>).isSelectable ?? true
  }));

  if (!a11ySelectionOptions.some(option => option.tabIndex === 0)) {
    a11ySelectionOptions[0].tabIndex = 0;
  }
  return a11ySelectionOptions;
};

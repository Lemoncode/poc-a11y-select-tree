export const updateFocusBySelectedOption = <Option>(options: Option[]) => {
  const a11ySelectionOptions = options.map((option, index) => ({
    ...option,
    tabIndex: index === 0 ? 0 : -1
  }));

  return a11ySelectionOptions;
};

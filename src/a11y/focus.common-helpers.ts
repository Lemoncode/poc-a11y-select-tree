export const getArrowUpIndex = (currentIndex: number, options: any[]) => {
  const isFirstOption = currentIndex === 0;
  return isFirstOption ? options.length - 1 : currentIndex - 1;
};

export const getArrowDownIndex = (currentIndex: number, options: any[]) => {
  const isLastOption = currentIndex === options.length - 1;
  return isLastOption ? 0 : currentIndex + 1;
};

export const getFocusedOption = <FocusableOption extends { tabIndex: number }>(
  options: FocusableOption[]
) => options.find((option) => option.tabIndex === 0);

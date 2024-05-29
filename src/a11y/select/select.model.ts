export type A11ySelectOption<Option> = Option & {
  isSelectable: boolean;
  tabIndex: number;
};

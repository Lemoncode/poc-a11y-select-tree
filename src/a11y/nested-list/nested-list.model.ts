export type BaseListItem<Option> = {
  id: string;
  children?: Option[];
};

export type FlatListItem<Option extends BaseListItem<Option>> = Omit<
  Option,
  'children'
> & {
  parentId?: string;
};

export type A11yListOption<Option extends BaseListItem<Option>> = Omit<
  Option,
  'children'
> & {
  tabIndex: number;
  children?: A11yListOption<Option>[];
};

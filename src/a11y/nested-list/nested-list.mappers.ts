import {
  A11yListOption,
  BaseListItem,
  FlatListItem
} from './nested-list.model';

export const mapOptionsToFlatOptions = <Option extends BaseListItem<Option>>(
  options: Option[],
  parentId?: string
): FlatListItem<Option>[] => {
  return options.reduce<FlatListItem<Option>[]>((acc, o) => {
    const { children, ...option } = o;
    const flatOption: FlatListItem<Option> = {
      ...option,
      parentId
    };
    return [
      ...acc,
      flatOption,
      ...(children ? mapOptionsToFlatOptions(children, option.id) : [])
    ];
  }, []);
};

export const mapFlatOptionsToOptions = <Option extends BaseListItem<Option>>(
  flatOptions: A11yListOption<FlatListItem<Option>>[]
): A11yListOption<Option>[] => {
  const map = new Map<string, any>();
  flatOptions.forEach(flatOption => {
    const { parentId, tabIndex, id, ...option } = flatOption;
    map.set(id, { ...option, id, tabIndex, children: undefined });
  });

  const rootIds = new Set(map.keys());

  flatOptions.forEach(flatOption => {
    const { parentId, id } = flatOption;
    const parent = map.get(parentId!);
    const child = map.get(id);
    if (parent && child) {
      if (parent.children === undefined) {
        parent.children = [];
      }
      parent.children.push(child);
      rootIds.delete(id);
    }
  });

  return Array.from(rootIds).map(id => map.get(id));
};

import { A11yTreeOption, BaseOption, FlatOption } from './tree.model';
import { A11ySelectOption } from '../select';

export const mapOptionsToFlatOptions = <Option extends BaseOption<Option>>(
  options: Option[],
  parentId?: string
): FlatOption<Option>[] => {
  return options.reduce<FlatOption<Option>[]>((acc, o) => {
    const { children, ...option } = o;
    const flatOption: FlatOption<Option> = {
      ...option,
      parentId,
      isSelectable: children ? false : true
    };
    return [
      ...acc,
      flatOption,
      ...(children ? mapOptionsToFlatOptions(children, option.id) : [])
    ];
  }, []);
};

export const mapFlatOptionsToOptions = <Option extends BaseOption<Option>>(
  flatOptions: A11ySelectOption<FlatOption<Option>>[]
): A11yTreeOption<Option>[] => {
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

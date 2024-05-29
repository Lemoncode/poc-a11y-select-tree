import { A11yTreeOption } from '../a11y';
import { TreeOption } from '../app';

interface Props {
  option: A11yTreeOption<TreeOption>;
  selectedOption: A11yTreeOption<TreeOption> | undefined;
  onFocusOption: (option: A11yTreeOption<TreeOption>) => (element: any) => void;
  handleSelectOption: (id: string) => void;
}

export const ChildrenList: React.FC<Props> = props => {
  const { option, selectedOption, handleSelectOption, onFocusOption } = props;
  return (
    <li
      key={option.id}
      role="treeitem"
      aria-expanded="true"
      // aria-disabled="true"
      aria-selected="false"
      tabIndex={option.tabIndex}
      ref={onFocusOption(option)}
    >
      {option.label}
      <ul role="group">
        {option.children?.map(child => {
          return child.children ? (
            <ChildrenList
              handleSelectOption={handleSelectOption}
              option={child}
              selectedOption={selectedOption}
              key={child.id}
              onFocusOption={onFocusOption}
            ></ChildrenList>
          ) : (
            <li
              key={child.id}
              role="treeitem"
              tabIndex={child.tabIndex}
              aria-selected={selectedOption?.id === child.id}
              // aria-disabled={child.isSelectable}
              onClick={() => handleSelectOption(child.id)}
              ref={onFocusOption(child)}
            >
              {child.label}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

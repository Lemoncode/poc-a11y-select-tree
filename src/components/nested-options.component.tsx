import { A11yNestedSelectOption } from '../a11y';
import { TreeOption } from '../app';

interface Props {
  option: A11yNestedSelectOption<TreeOption>;
  selectedOption: TreeOption | undefined;
  onFocusOption: (
    option: A11yNestedSelectOption<TreeOption>
  ) => (element: any) => void;
  handleSelectOption: (option: string | undefined) => void;
}

export const NestedOptions: React.FC<Props> = props => {
  const { option, selectedOption, handleSelectOption, onFocusOption } = props;
  return (
    <li
      key={option.id}
      id={option.id}
      role="treeitem"
      aria-expanded="true"
      aria-disabled="true"
      aria-selected="false"
      tabIndex={option.tabIndex}
      ref={onFocusOption(option)}
      onClick={e => {
        e.stopPropagation();
        handleSelectOption('');
      }}
    >
      {option.label}
      <ul role="group">
        {option.children?.map(child => {
          return child.children ? (
            <NestedOptions
              handleSelectOption={handleSelectOption}
              option={child}
              selectedOption={selectedOption}
              key={child.id}
              onFocusOption={onFocusOption}
            ></NestedOptions>
          ) : (
            <li
              key={child.id}
              id={child.id}
              role="treeitem"
              tabIndex={child.tabIndex}
              aria-selected={selectedOption?.id === child.id}
              aria-disabled={!child.isSelectable}
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

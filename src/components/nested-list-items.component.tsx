import { A11yNestedListOption } from '../a11y';
import { TreeOption } from '../app';

interface Props {
  option: A11yNestedListOption<TreeOption>;
  onFocusOption: (option: A11yNestedListOption<TreeOption>) => (element: any) => void;
}

export const NestedListItems: React.FC<Props> = props => {
  const { option, onFocusOption } = props;
  return (
    <li key={option.id} tabIndex={option.tabIndex} ref={onFocusOption(option)}>
      {option.label}
      <ul tabIndex={-1}>
        {option.children?.map(child => {
          return child.children ? (
            <NestedListItems
              option={child}
              onFocusOption={onFocusOption}
              key={child.id}
            ></NestedListItems>
          ) : (
            <li
              key={child.id}
              tabIndex={child.tabIndex}
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

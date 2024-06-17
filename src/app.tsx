import React from 'react';
import { NestedSelect, Select, NestedList } from './components';
import { LIST_OPTION, OPTION_LABELS, TREE_OPTION } from './selectsValues.mock';

export interface TreeOption {
  id: string;
  label: string;
  children?: TreeOption[];
}

export const App = () => {
  const [value, setValue] = React.useState<TreeOption | undefined>({
    id: 'lb23-00',
    label: 'Amazon'
  });

  const handleValueChange = (option: TreeOption | undefined) => {
    setValue(option);
  };

  console.log('me cargo');
  return (
    <div className="container">
      <Select options={OPTION_LABELS} />
      <NestedSelect
        options={TREE_OPTION}
        value={value}
        onChange={handleValueChange}
        // key={`Value-${value?.id}`}
      />

      <div>
        <p id="combo3-label">Real select</p>
        <select aria-labelledby="combo3-label">
          <option id="lb3-01">weather</option>
          <option id="lb3-02">salsa recipes</option>
          <option id="lb3-03">cheap flights to NY</option>
          <option id="lb3-04">dictionary</option>
          <option id="lb3-05">baseball scores</option>
          <option id="lb3-06">hotels in NY</option>
        </select>
      </div>
      <NestedList options={LIST_OPTION} />
    </div>
  );
};

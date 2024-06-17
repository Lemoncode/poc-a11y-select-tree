import React from 'react';
import { NestedSelect, Select, NestedList } from './components';

export interface TreeOption {
  id: string;
  label: string;
  children?: TreeOption[];
}

const OPTION_LABELS = [
  'weather',
  'salsa recipes',
  'cheap flights to NY',
  'dictionary',
  'baseball scores',
  'hotels in NY',
  'mortgage calculator',
  'restaurants near me',
  'free games',
  'gas prices',
  'classical music'
];

export const TREE_OPTION: TreeOption[] = [
  {
    id: 'lb2-01',
    label: 'weather'
  },
  { id: 'lb2-02', label: 'salsa recipes' },
  { id: 'lb2-03', label: 'cheap flights to NY' },
  { id: 'lb2-04', label: 'dictionary' },
  { id: 'lb2-05', label: 'baseball scores' },
  {
    id: 'lb2-06',
    label: 'hotels in NY',

    children: [
      { id: 'lb22-01', label: 'Watter' },
      { id: 'lb22-02', label: 'Sea' },
      {
        id: 'lb22-03',
        label: 'River',

        children: [
          { id: 'lb23-00', label: 'Amazon' },
          { id: 'lb23-01', label: 'Nile' },
          { id: 'lb23-02', label: 'Mississippi' }
        ]
      }
    ]
  },
  { id: 'lb2-07', label: 'mortgage calculator' },
  { id: 'lb2-08', label: 'restaurants near me' },
  { id: 'lb2-09', label: 'free games' },
  { id: 'lb2-10', label: 'gas prices' },
  { id: 'lb2-11', label: 'classical music' }
];

export const App = () => {
  const [value, setValue] = React.useState<TreeOption | undefined>({
    id: 'lb23-00',
    label: 'Amazon'
  });

  const handleValueChange = (option: TreeOption | undefined) => {
    setValue(option);
  };

  return (
    <div className="container">
      <Select options={OPTION_LABELS} />
      <NestedSelect
        options={TREE_OPTION}
        value={value}
        onChange={handleValueChange}
      />

      <div>
        <p id="combo3-label">Real select</p>
        <select aria-labelledby="combo3-label">
          <option id="lb3-01">weather</option>
          <option id="lb2-02">salsa recipes</option>
          <option id="lb2-03">cheap flights to NY</option>
          <option id="lb2-04">dictionary</option>
          <option id="lb2-05">baseball scores</option>
          <option id="lb2-06">hotels in NY</option>
        </select>
      </div>
      <NestedList options={TREE_OPTION} />
    </div>
  );
};

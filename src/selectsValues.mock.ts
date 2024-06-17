import { TreeOption } from './app';

export const OPTION_LABELS = [
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

export const LIST_OPTION: TreeOption[] = [
  {
    id: 'lb4-01',
    label: 'weather'
  },
  { id: 'lb4-02', label: 'salsa recipes' },
  { id: 'lb4-03', label: 'cheap flights to NY' },
  { id: 'lb4-04', label: 'dictionary' },
  { id: 'lb4-05', label: 'baseball scores' },
  {
    id: 'lb4-06',
    label: 'hotels in NY',

    children: [
      { id: 'lb42-01', label: 'Watter' },
      { id: 'lb42-02', label: 'Sea' },
      {
        id: 'lb42-03',
        label: 'River',

        children: [
          { id: 'lb43-00', label: 'Amazon' },
          { id: 'lb43-01', label: 'Nile' },
          { id: 'lb43-02', label: 'Mississippi' }
        ]
      }
    ]
  },
  { id: 'lb4-07', label: 'mortgage calculator' },
  { id: 'lb4-08', label: 'restaurants near me' },
  { id: 'lb4-09', label: 'free games' },
  { id: 'lb4-10', label: 'gas prices' },
  { id: 'lb4-11', label: 'classical music' }
];

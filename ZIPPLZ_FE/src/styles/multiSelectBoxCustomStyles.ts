import { StylesConfig } from 'react-select';

const multiSelectBoxCustomStyles: StylesConfig<any, true> = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: state.isFocused ? '#ccc' : provided.borderColor,
    '&:hover': {
      borderColor: '#73744A ',
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid #ccc',
    height: 70,
    overflow: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  menuList: (provided) => ({
    ...provided,
    height: 70,
    fontSize: '12px',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#ebebeb',
    fontSize: '13px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    backgroundColor: '#ebebeb',
    ':hover': {
      backgroundColor: '#e9e8d5',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    maxHeight: 100,
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
};

export default multiSelectBoxCustomStyles;

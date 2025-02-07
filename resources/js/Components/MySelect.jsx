import React from 'react';
import Select from 'react-select';

export default function MySelect({
  options = [],
  isClearable = true,
  isSearchable = true,
  placeholder = 'Select an option',
  onChange,
  ...props
}) {
  // Example log for debugging props
//   console.log(props);

  return (
    <Select
    styles={{
        container: (provided) => ({
          ...provided,
          width: '100%',
        }),
        control: (provided) => ({
          ...provided,
          border: '0px solid #ebebeb',
          height: '46px',
          backgroundColor: '#313133',
          borderRadius: '4px',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#f9f9f9',
          lineHeight: '46px',
          paddingLeft: '15px',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          height: '44px',
          width: '40px',
          color: '#c8c8c8',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        menu: (provided) => ({
          ...provided,
          border: '1px solid #313133',
        }),
        menuList: (provided) => ({
          ...provided,
          padding: '6px 12px',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#eeeeee' : state.isFocused ? '#ff0015' : null,
          color: state.isSelected ? '#435966' : state.isFocused ? '#ffffff' : null,
          padding: '6px 12px',
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#ff0015',
          border: '1px solid transparent',
          color: '#ffffff',
          borderRadius: '3px',
          padding: '0 7px',
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#ffffff',
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#ffffff',
          ':hover': {
            backgroundColor: '#ff0015',
            color: '#ffffff',
          },
        }),
        input: (provided) => ({
          ...provided,
          marginTop: '7px',
          border: '0',
          color: '#fff',
          fontWeight: 500,
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '6px 12px',
        }),
      }}

      isClearable={isClearable}
      isSearchable={isSearchable}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      {...props}
      />
  )
}

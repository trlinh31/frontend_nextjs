import React from 'react';
import Select from 'react-select';

export const ComboboxComponent = ({ options, setSelectedValue, keySearch, setKeySearch }: any) => {
  const handleChange = (e: any) => {
    setSelectedValue(e.value);
  };

  return (
    <>
      <Select
        id='abc'
        className='w-[300px]'
        classNamePrefix='select'
        value={options.value}
        inputValue={keySearch}
        onInputChange={(e) => setKeySearch(e)}
        onChange={handleChange}
        isClearable={false}
        isSearchable={true}
        name='color'
        options={options}
      />
    </>
  );
};

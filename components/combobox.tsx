'use client';
import React, { useId } from 'react';
import Select from 'react-select';

export const ComboboxComponent = ({ options, setSelectedValue, keySearch, setKeySearch }: any) => {
  const handleChange = (e: any) => {
    setSelectedValue(e.value);
  };

  return (
    <>
      <Select
        className='w-[300px] text-black'
        instanceId={useId()}
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

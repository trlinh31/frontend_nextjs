'use client';
import React, { useId } from 'react';
import Select from 'react-select';

export const ComboboxComponent = ({ options, setSelectedValue, keySearch, setKeySearch }: any) => {
  const id = useId();
  const handleChange = (e: any) => {
    setSelectedValue(e.value);
  };

  return (
    <>
      <Select
        className='w-[300px] text-black'
        defaultValue={options && options[0]}
        instanceId={id}
        inputValue={keySearch}
        onInputChange={(e) => setKeySearch(e)}
        onChange={handleChange}
        isClearable={false}
        isSearchable={true}
        placeholder={'Chọn khách hàng'}
        options={options}
      />
    </>
  );
};

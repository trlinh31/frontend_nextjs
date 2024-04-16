'use client';
import { getCustomerByName, getCustomerDetails } from '@/api/customer';
import { ComboboxComponent } from '@/components/combobox';
import { useEffect, useState } from 'react';

type CustomerOption = {
  value: string;
  label: string;
};

export default function RowSelectCustomer({ setCustomer }: { setCustomer: any }) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const fetchCustomer = async () => {
    const { data } = await getCustomerByName(searchKeyword);
    if (data) {
      const options = data.map(({ id, fullName }: { id: string; fullName: string }) => ({ value: id, label: fullName }));
      setCustomerOptions(options);
    }
  };

  const fetchDetailCustomer = async () => {
    if (selectedValue) {
      const { data } = await getCustomerDetails(selectedValue);
      setCustomer(data);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [searchKeyword]);

  useEffect(() => {
    fetchDetailCustomer();
  }, [selectedValue]);

  return (
    <>
      <ComboboxComponent options={customerOptions} setSelectedValue={setSelectedValue} keySearch={searchKeyword} setKeySearch={setSearchKeyword} />
    </>
  );
}

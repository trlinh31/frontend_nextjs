import { Category } from '@/types/category.type';
import { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdChevronRight, MdKeyboardArrowDown, MdAddBox, MdIndeterminateCheckBox } from 'react-icons/md';

const icons = {
  check: <MdCheckBox className='rct-icon-check' />,
  uncheck: <MdCheckBoxOutlineBlank className=' rct-icon-uncheck' />,
  halfCheck: <MdIndeterminateCheckBox className=' rct-icon-half-check' />,
  expandClose: <MdChevronRight className=' rct-icon-expand-close' />,
  expandOpen: <MdKeyboardArrowDown className=' rct-icon-expand-open' />,
  expandAll: <MdAddBox className=' rct-icon-expand-all' />,
  collapseAll: <MdIndeterminateCheckBox className=' rct-icon-collapse-all' />,
  parentClose: null,
  parentOpen: null,
  leaf: null,
};

type propsType = {
  initialData: Category[] | null;
  dataCheckbox: string[];
  setDataCheckbox: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TreeCheckbox({ initialData, dataCheckbox, setDataCheckbox }: propsType) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const nodes = initialData?.map((item) => ({
    value: item.id,
    label: item.name,
    children: item.subCategories?.map((sub) => ({
      value: sub.id,
      label: sub.name,
    })),
  }));

  return (
    <CheckboxTree
      nodes={nodes!!}
      icons={icons}
      checked={dataCheckbox}
      expanded={expanded}
      onCheck={(checked) => setDataCheckbox(checked)}
      onExpand={(expanded) => setExpanded(expanded)}
    />
  );
}

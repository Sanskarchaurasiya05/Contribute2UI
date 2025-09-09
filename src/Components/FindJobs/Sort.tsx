import { useState } from 'react';
import { Button, Combobox, useCombobox} from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt = ['Relevance','Most Recent','Salary: Low to High','Salary (Low to High)','Salary (High to Low)'];
const Sort=()=> {
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
         
          <Button variant="default" onClick={() => combobox.toggleDropdown()}>
 <div className='cursor-pointer border border-bright-sun-400 flex gap-2 px-2 py-1 items-center rounded-xl '>
            {selectedItem} <IconAdjustments className='h-5 w-5 text-bright-sun-400'/>
          </div>
          </Button>
         
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export default Sort;
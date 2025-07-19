import { useEffect, useState } from 'react';
import {
  Checkbox,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
} from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons-react';

const initialGroceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
];

const MAX_DISPLAYED_VALUES = 2;

const MultiInput = (props:any) => {
  useEffect(() => {
    setData(props.options);
  },[])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);

  // Filter options based on search
  const filteredOptions = data.filter((item) =>
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Check if an exact option already exists
  const exactMatch = data.some(
    (item) => item.toLowerCase() === search.trim().toLowerCase()
  );

  const handleValueSelect = (val: string) => {
    if (val.startsWith('$create:')) {
      const newItem = val.replace('$create:', '').trim();
      if (!newItem) return;

      setData((prev) => [...prev, newItem]);
      setValue((current) => [...current, newItem]);
      setSearch('');
      combobox.closeDropdown();
    } else {
      setValue((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val]
      );
      setSearch('');
    }
  };

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const displayedValues = value
    .slice(
      0,
      value.length === MAX_DISPLAYED_VALUES
        ? MAX_DISPLAYED_VALUES
        : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        <Checkbox
          size="xs"
          checked={value.includes(item)}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    > 
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          rightSection={<IconSelector/>}
          onClick={() => combobox.openDropdown()}
          leftSection={
            <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
              <props.icon/>
            </div>
          }
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {displayedValues}
                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder></Input.Placeholder>
            )}

            {/* 🔄 Real Input Field for Typing & Searching */}
            <Combobox.EventsTarget>
              <PillsInput.Field
                value={search}
               placeholder={value.length > 0 ? '' :  props.title}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                  combobox.openDropdown(); // open dropdown as user types
                }}
                onClick={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search === '') {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}

          {/* Create option */}
          {search.trim() !== '' && !exactMatch && (
            <Combobox.Option value={`$create:${search}`}>
              + Create "{search}"
            </Combobox.Option>
          )}

          {/* Empty state */}
          {filteredOptions.length === 0 && exactMatch && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;

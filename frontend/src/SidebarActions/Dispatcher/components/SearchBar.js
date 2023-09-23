import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function SearchBar({ text,Options, setOptions, onSelect }) {
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    // Call the callback function when a user is selected
    if (selected) {
      onSelect(selected);
    }
  }, [selected, onSelect]);

  return (
    <div className='select-color'>
      <Select
        options={Options}
        value={selected}
        onChange={(selectedOption) => setSelected(selectedOption)}
        placeholder= {text}
      />
    </div>
  );
}

export default SearchBar;

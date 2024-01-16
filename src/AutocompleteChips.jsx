import React, { useState } from 'react';

const AutocompleteChips = () => {
  const itemList = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(itemList);


  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);

    const filteredItems = itemList.filter(item => item.toLowerCase().includes(value));
    setFilteredItems(filteredItems);
  };

  const handleItemClick = (item) => {
    addChip(item);
  };

  const addChip = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue('');

    // Remove the selected item from the available items list
    const updatedItems = filteredItems.filter(i => i !== item);
    setFilteredItems(updatedItems);
  };

  const removeChip = (index) => {
    const removedItem = selectedItems[index];
    const updatedItems = selectedItems.filter((item, i) => i !== index);
    setSelectedItems(updatedItems);

    // Add the removed item back to the available items list
    setFilteredItems([...filteredItems, removedItem]);
  };

  return (
    <div className='mx-auto w-80'>
      <div className="chips flex w-full">
        {selectedItems.map((item, index) => (
          <div className="chip mr-2 px-2 w-96 border border-gray-300 mt-5 mb-3" key={index}>
            <span>{item}</span>
            <button onClick={() => removeChip(index)}>&times;</button>
          </div>
        ))}
      </div>
      <input
        className='w-96 border border-gray-300 mt-5 mb-3 py-2 rounded-lg'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to filter items"
      />
      <div className="itemListContainer">
        {filteredItems.map((item, index) => (
          <div className="item px-2 py-1 bg-orange-100 w-24 mb-3 rounded-lg" key={index} onClick={() => handleItemClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteChips;

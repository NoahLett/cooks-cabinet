import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.css';

export default function Search() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='search-container'>
      <div className="input-container">
        <FaSearch className='search-icon'/>
        <input
        type="text"
        placeholder='Search...'
        value={searchQuery}
        onChange={handleInputChange}
        className="search-bar" />
      </div>
    </div>
  );
}

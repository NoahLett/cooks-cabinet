import React, { useState } from 'react';
import './Search.css';

export default function Search() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='search-container'>
      <img className='search-image' src="/images/home-2.webp" alt="Beautiful Food" />
      <input
        type="text"
        placeholder='Search...'
        value={searchQuery}
        onChange={handleInputChange}
        className="search-bar" />
    </div>
  );
}

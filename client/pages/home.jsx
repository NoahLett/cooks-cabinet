import React from 'react';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import RecipeFeed from '../components/RecipeFeed';

export default function Home(props) {
  return (
    <div>
      <Search/>
      <Carousel/>
      <RecipeFeed/>
    </div>
  );
}

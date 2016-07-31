import React from 'react';
import AddHero from './parts/AddHero'
import HeroListGenerator from './parts/HeroListGenerator'
import checkAuth from '../requireAuth';

const HeoresPage = () => {
  return (
    <div>
      <AddHero />
      <HeroListGenerator />
    </div>
  );
};

export default checkAuth(HeoresPage);

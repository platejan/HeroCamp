import React from 'react';
import HeroesList from '../../containers/heroes/HeroesList'
import checkAuth from '../requireAuth';

const HeoresPage = () => {
  return (
    <HeroesList/>
  );
};

export default checkAuth(HeoresPage);

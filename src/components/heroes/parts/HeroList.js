import React, {Component, PropTypes} from 'react';
import Hero from './Hero';

const HeroList = (data) => {
  const heroes = data.data;
  let dataArray = [];
  Object.keys(heroes).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    dataArray.push({ItemKey: key , ItemContent: heroes[key]});
  });

  let listItems;
  if (dataArray.length>0){
    listItems = dataArray.map((hero) => {

      const itemKey = hero.ItemKey;
      const itemName = hero.ItemContent.name;
      const itemDescription = hero.ItemContent.description;

      return (
        <Hero ItemKey={itemKey} ItemName={itemName} ItemDescription={itemDescription} />
      );
    });
  }else{
    listItems = <p>No heroes.</p>;
  }

  return (
    <div>
      <h1>List of heroes:</h1>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

export default HeroList;

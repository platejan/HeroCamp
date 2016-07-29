import React, {Component, PropTypes} from 'react';
import ListItem from './ListItem'

const ListOfChapters = (data) => {
  const chapters = data.data;
  let dataArray = [];
  Object.keys(chapters).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    dataArray.push({ItemKey: key , ItemContent: chapters[key]});
  });

  let listItems;
  if (dataArray.length>0){
    listItems = dataArray.map((chapter) => {
      
      const itemKey = chapter.ItemKey;
      const itemName = chapter.ItemContent.name;
      
      return (
        <ListItem ItemKey={itemKey} ItemName={itemName} />
      );
    });
  }else{
    listItems = <p>No data</p>;
  }


  return (
    <div>
      <h1>List of chapters:</h1>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};


export default ListOfChapters;

import React, {Component, PropTypes} from 'react';
import ListItem from './ListItem'

const ListOfRuns = (data) => {
  var runs = data.data;
  var dataArray = [];
  Object.keys(runs).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    dataArray.push({ItemKey: key , ItemContent: runs[key]});
  });

  let listItems;
  if (dataArray.length>0){
    listItems = dataArray.map((run) => {
      
      const itemKey = run.ItemKey;
      const itemName = run.ItemContent.name;
      
      return (
        <ListItem ItemKey={itemKey} ItemName={itemName} />
      );
    });
  }else{
    listItems = <p>No data</p>;
  }


  return (
    <div>
      <h1>List of runs:</h1>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};


export default ListOfRuns;

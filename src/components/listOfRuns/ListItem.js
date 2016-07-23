import React, {PropTypes} from 'react';

const ListItem = ({ItemKey, ItemName}) => {
  return (
    <li id={ItemKey}>{ItemName}</li>
  );
};

ListItem.propTypes = {
  ItemKey: PropTypes.string.isRequired,
  ItemName: PropTypes.string.isRequired
};

export default ListItem;

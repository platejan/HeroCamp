import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import * as StoriesActions from '../../actions/StoriesActions';
import Story from '../../components/stories/parts/Story';
import HeroAdd from '../../components/heroes/parts/HeroAdd';


const mapStateToProps = (state) => {
  return {
    stories: state.stories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(StoriesActions.storiesLoadStart());
    }
  };
};

class StoriesList extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const data = this.props.stories;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let listStories = "";
    if (dataArray.length > 0) {
      listStories = dataArray.map((story,index) => {

        const itemKey = story.ItemKey;
        const itemContent = story.ItemContent;

        return (
          <Story key={index} itemKey={itemKey} itemContent={itemContent}/>
        );
      });
    }
    const style={
      padding: '7.5px'
    };
    return (
      <div className="col-xs-12" style={style}>
        {listStories}
      </div>
    );
  }
}

StoriesList.propTypes = {
  onMount: PropTypes.func.isRequired,
  stories: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesList);

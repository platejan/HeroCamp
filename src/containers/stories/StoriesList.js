import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as StoriesActions from '../../actions/StoriesActions';
import Story from '../../components/stories/parts/Story';
import StoryToolbar from '../../components/stories/parts/StoryToolbar';


class StoriesList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filters: {
        myStories: false,
        favouriteStories: false
      }
    };
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  toggleFilter(key) {
    this.setState(Object.assign({},this.state, {filters: Object.assign({},this.state.filters, {[key]: !this.state.filters[key]})}));
  }

  render() {
    console.log(this.state);
    const data = this.props.stories;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      if (key != "favouriteStories")
        dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let listStories = "";
    if (dataArray.length > 0) {
      listStories = dataArray.map((story, index) => {

        const itemKey = story.ItemKey;
        const itemContent = story.ItemContent;

        if (!itemContent.delete && (!this.state.filters.myStories || itemContent.owner == this.props.userUID) && (!this.state.filters.favouriteStories || (this.props.stories.favouriteStories && this.props.stories.favouriteStories[itemKey])))
          return (
            <Story favourite={(this.props.stories.favouriteStories && this.props.stories.favouriteStories[itemKey])} key={index} itemKey={itemKey} itemContent={itemContent}/>
          );
      });
    }
    const style = {
      padding: '7.5px'
    };
    return (
      <div className="col-xs-12" style={style}>
        <StoryToolbar filters={this.state.filters} toggleFilter={this.toggleFilter}/>
        {listStories}
      </div>
    );
  }
}

StoriesList.propTypes = {
  onMount: PropTypes.func.isRequired,
  stories: PropTypes.object.isRequired
};

StoriesList.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    stories: state.stories,
    userUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => {
      dispatch(StoriesActions.storiesLoadStart());
      dispatch(StoriesActions.favouriteStoriesLoadStart());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class StoryToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        name: "",
        owner: this.props.ownerID
      },
      me: this.props.ownerID
    };
  }

  render() {
    return (
      <div className="row" style={{margin: '-7.5px',marginBottom: '7.5px'}}>
        <div>
          <div className="stories-menu-left col-xs-12 col-sm-6">
            <button type="button" className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span>Create
              story
            </button>
          </div>
          <div className="stories-menu-left text-right col-xs-12 col-sm-6">
            <div className="btn-group">
              <button type="button" className="btn"><span className="glyphicon glyphicon-user"></span>My stories
              </button>
              <button type="button" className="btn"><span className="glyphicon glyphicon-heart"></span>Favourite stories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StoryToolbar.propTypes = {
  ownerID: PropTypes.string.isRequired
};

StoryToolbar.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryToolbar);

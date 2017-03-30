import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Notification extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
  }

  delete() {
    this.props.delete(this.props.itemKey);
  }

  render() {
    let content = this.props.itemContent;

    return (
      <div className="col-xs-12 marginTop15 btn-group">
            <button className="col-xs-11 btn btn-default">{content.text}</button>
            <button className="col-xs-1 btn btn-danger" onClick={this.delete}>
              <span className="glyphicon glyphicon-trash noText"></span>
            </button>
      </div>
    );
  }
}
Notification.propTypes = {};

Notification.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    usernames: state.usernames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

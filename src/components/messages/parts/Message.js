import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Message extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.showDetail = this.showDetail.bind(this);
  }

  componentWillMount() {
  }

  showDetail() {
    this.props.showDetail(this.props.itemKey);
  }

  render() {
    let message = this.props.itemContent;

    return (
      <div className="panel panel-default" onClick={this.showDetail}>
        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              <dl className="dl-horizontal col-sm-6">
              <dt style={{width:"100px"}}>sender:</dt>
              <dd style={{magrinLeft: "0"}}>{this.props.usernames ? this.props.usernames[message.sender].name : message.sender}</dd>
            </dl>
              <dl className="dl-horizontal col-sm-6">
                <dt style={{width:"100px"}}>recipient:</dt>
                <dd style={{magrinLeft: "0"}}>{this.props.usernames ? this.props.usernames[message.recipient].name : message.recipient}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Message.propTypes = {};

Message.contextTypes = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(Message);

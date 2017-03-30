import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MessageDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillMount() {
  }

  deleteMessage(){
    this.props.deleteMessage(this.props.folder,this.props.messageKey);
  }

  render() {
    if (this.props.messages && this.props.messages[this.props.folder] && this.props.messages[this.props.folder][this.props.messageKey]) {

      let message = this.props.messages[this.props.folder][this.props.messageKey];
      console.log(message);
      return (
        <div className="">
          <div className="panel panel-default">
            <div className="row">
              <div className="col-xs-12">
                <h3>{message.subject ? message.subject : ""}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <dl className="dl-horizontal">
                  <dt>sender:</dt>
                  <dd>{this.props.usernames? this.props.usernames[message.sender].name: message.sender}</dd>
                  <dt>recipient:</dt>
                  <dd>{this.props.usernames? this.props.usernames[message.recipient].name: message.recipient}</dd>
                  <dt></dt>
                  <dd><button onClick={this.deleteMessage}><span className="glyphicon glyphicon-trash"></span> delete</button></dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="row">
              <div className="col-xs-12">
                {message.text ? message.text : ""}
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}
MessageDetail.propTypes = {};

MessageDetail.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    usernames: state.usernames,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail);

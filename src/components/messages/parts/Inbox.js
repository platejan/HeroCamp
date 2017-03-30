import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadMessages} from '../../../actions/messagesActions';
import Message from './Message';

class Inbox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages : Object.assign({},this.props.messagesInbox)
    };
    this.showDetail = this.showDetail.bind(this);
  }

  componentWillMount() {
  }
  componentWillReceiveProps(nextProps){
    let state = this.state;
    state.messages = Object.assign({},nextProps.messagesInbox);
    this.setState(state);
  }

  showDetail(key){
   this.props.showDetail('inbox',key);
  }

  render() {
    console.log(this.state.messages);
    let messages = "";
    let data = this.state.messages;
    let dataArray = [];
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
    }
    if (dataArray.length > 0) {
      messages = dataArray.map((Item, index) => {

        const itemKey = Item.ItemKey;
        const itemContent = Item.ItemContent;

        if (!itemContent.delete) {
          return (
            <Message key={itemKey}
                     itemKey={itemKey}
                     itemContent={itemContent}
                     showDetail={this.showDetail}/>
          );
        }
      });
    }

    return (
      <div>
        {messages}
      </div>
    );
  }
}
Inbox.propTypes = {};

Inbox.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    messagesInbox: state.messages.inbox
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

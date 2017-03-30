import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {loadMessages, createMessage, deleteMessage} from '../../actions/messagesActions';
import Inbox from './parts/Inbox';
import Outbox from './parts/Outbox';
import MessageDetail from './parts/MessageDetail';
import NewMessage from './parts/NewMessage';
import toastr from 'toastr';


class MessagesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      viewDetail: false,
      detail: {
        folder: "",
        key: ""
      },
      tab: 0
    };
    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
    this.tabSwitch = this.tabSwitch.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillMount() {
    this.props.beforeMount();
  }

  sendMessage(message) {
    console.log(message);
    this.props.actions.createMessage(message, (error = null)=> {
      if (error == null) {
        toastr.success("Message send");
      } else {
        toastr.error(error);
      }
    });
  }

  deleteMessage(folder, messageKey) {
    this.props.actions.deleteMessage(messageKey, this.props.currentUID, folder, (error = null)=> {
      if (error == null) {
        toastr.success("Message deleted");
        this.hideDetail();
      } else {
        toastr.error(error);
      }
    });
  }

  hideDetail(){
    let state = this.state;
    state.viewDetail = false;
    state.tab = 0;
    this.setState(state);
  }
  showDetail(folder, key) {
    console.log("show detail: " + key + " from folder: " + folder);
    let state = this.state;
    state.detail.key = key;
    state.detail.folder = folder;
    state.viewDetail = true;
    state.tab = 1;
    this.setState(state);
  }

  tabSwitch(index, last) {
    let newState = this.state;
    newState.tab = index;
    this.setState(newState);
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-6">
            <Tabs>
              <TabList>
                <Tab>Inbox</Tab>
                <Tab>Outbox</Tab>
                <Tab>Drafts</Tab>
              </TabList>
              <TabPanel>
                <Inbox showDetail={this.showDetail}/>
              </TabPanel>
              <TabPanel>
                <Outbox showDetail={this.showDetail}/>
              </TabPanel>
              <TabPanel>

              </TabPanel>
            </Tabs>
          </div>
          <div className="col-xs-6">
            <Tabs
              onSelect={this.tabSwitch}
              selectedIndex={this.state.tab}>
              <TabList>
                <Tab>New message</Tab>
                {this.state.viewDetail && <Tab>Detail</Tab>}
              </TabList>
              <TabPanel>
                <NewMessage sendMessage={this.sendMessage}/>
              </TabPanel>
              {this.state.viewDetail && <TabPanel>
                <MessageDetail deleteMessage={this.deleteMessage} folder={this.state.detail.folder}
                               messageKey={this.state.detail.key}/>
              </TabPanel>}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
MessagesPage.propTypes = {};

MessagesPage.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeMount: () => {
      dispatch(loadMessages());
    },
    actions: bindActionCreators({createMessage,deleteMessage}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);

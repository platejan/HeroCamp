import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';
import SelectInput from '../../common/SelectInput';

class NewMessage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sender: this.props.currentUID,
      recipient: "",
      text: "",
      subject: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.initMessage = this.initMessage.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  componentWillMount() {
  }

  initMessage(){
    let state = {
      sender: this.props.currentUID,
      recipient: "",
      text: "",
      subject: ""
    };
    this.setState(state);
  }

  sendMessage() {
    let message = Object.assign({},this.state);
    if (message.recipient.value) {
      message.recipient = message.recipient.value;
      this.props.sendMessage(message);
      this.initMessage();
    }
    else
      console.log("error: recipient need!");
  }

  onchange(event) {
    let state = this.state;
    state[event.target.name] = event.target.value;
    console.log(state);
    return this.setState(state);
  }

  render() {

    let potentialRecipients = [];
    const data = this.props.usernames;
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        potentialRecipients.push({value: key, label: data[key].name});
      });
    }

    return (
      <div className="">
        <form>
          <SelectInput
            name="recipient"
            value={this.state.recipient? this.state.recipient.value : ""}
            label="Recipient"
            options={potentialRecipients}
            onChange={this.onchange}
            clearable={true}
          />
          <TextInput
            name="subject"
            label="Subbject"
            onChange={this.onchange}
            value={this.state.subject}
          />
          <div className="form-group marginTop15">
            <div className="field">
              <TextareaInput
                className="form-control"
                name="text"
                label="text"
                onChange={this.onchange}
                value={this.state.text}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={this.sendMessage}
            className="btn btn-success">
            <span className="glyphicon glyphicon-send"> </span> send message
          </button>
        </form>
      </div>
    );
  }
}
NewMessage.propTypes = {};

NewMessage.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    usernames: state.usernames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {createPost} from '../../../actions/PostsActions';
import TextareaInput from '../../common/TextareaInput';
import {createNotification} from '../../../actions/notificationActions';
import SimpleMDE  from 'react-simplemde-editor';
import TextInput from '../../common/TextInput';

class CreateLibraryItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: "",
      name: ""
    };
    this.create = this.create.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  create(){
    this.props.create(this.state);
    this.setState(Object.assign({},this.state,{text:"",name:""}));
  }

  onchange(event) {
    let state = this.state;
    if(event.target)
    state[event.target.name] = event.target.value;
    else
      state.text = event;
    return this.setState(state);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <TextInput
            name="name"
            label="name"
            onChange={this.onchange}
            value={this.state.name}
          />
          <SimpleMDE
            onChange={this.onchange}
            value={this.state.text}/>
          <button onClick={this.create} className="btn btn-success pull-right">Create story</button>
        </div>
      </div>
    );
  }
}

CreateLibraryItem.propTypes = {};

CreateLibraryItem.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLibraryItem);

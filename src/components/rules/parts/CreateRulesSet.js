import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createRulesSet} from '../../../actions/rulesActions';
import toastr from 'toastr';
import TextInput from '../../common/TextInput';

class CreateRulesSet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.initialState = {
      nameOfRulesSet: "",
      rules: {}
    };
    this.state = this.initialState;

    this.onchange = this.onchange.bind(this);
    this.createRulesSet = this.createRulesSet.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state[field] = event.target.value;
    return this.setState(state);
  }

  createRulesSet() {
    if (this.state.name != "") {
      this.props.actions.createRulesSet(this.state, (error = null)=> {
        if (error == null) {
          toastr.success("rules set added", {timeOut: 250});
          this.setState(this.initialState);
        } else {
          toastr.error(error);
        }
      });
    } else {
      toastr.error("Rules set must have a name.");
    }
  }

  render() {
    return(
      <div>
      <form>
        <TextInput
          name="nameOfRulesSet"
          label="name of new rules set"
          onChange={this.onchange}
          value={this.state.nameOfRulesSet}
        />
        < button
          type="button"
          onClick={this.createRulesSet}
          className="btn btn-primary col-xs-12">
          <span className="glyphicon glyphicon-plus"> </span> Create rules set
        </button>
      </form>
        </div>
    );
  }
}
CreateRulesSet.propTypes = {};

CreateRulesSet.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createRulesSet}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRulesSet);

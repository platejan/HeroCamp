import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SelectInput from '../../../common/SelectInput';
import TextInput from '../../../common/TextInput';

class HeroRule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      state: false,
      display: false,
      edit: false,
      value: this.props.value
    };

    this.onchange = this.onchange.bind(this);
    this.validate = this.validate.bind(this);
  }

  onchange(event) {
    let state = this.state;
    state.value = event.target.value;
    this.setState(state);

    if (this.validate(event.target.value)) {
      this.props.onchange(event.target.name,event.target.value);
    }
  }

  validate(value) {
    if (value) {
      let state = this.state;
      state.error = false;
      this.setState(state);
      return true;
    }
    else {
      let state = this.state;
      state.error = true;
      this.setState(state);
      return false;
    }
  }

  render() {
    let render = (<div className="row">
      <div className="col-xs-12 col-sm-4"><span>{this.props.content.nameOfRule? this.props.content.nameOfRule : this.props.name}</span>:</div>
      <div className="col-xs-12 col-sm-8">{this.state.value}</div>
    </div>);
    if (this.props.edit) {
      render = (
        <div className="row">
          <div className="col-xs-12">
            <TextInput
              name={this.props.name}
              label={this.props.content.nameOfRule? this.props.content.nameOfRule : this.props.name}
              onChange={this.onchange}
              value={this.state.value? this.state.value : ""}
            />
          </div>
        </div>);
    }
    return (
      <div>
        {render}
      </div>
    );
  }
}
HeroRule.propTypes = {};

HeroRule.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroRule);

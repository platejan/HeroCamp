import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createUserWithEmailAndPassword} from '../../actions/authActions';
import RegistrationForm from './RegistrationForm';
import toastr from 'toastr';
import {LinkContainer} from 'react-router-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: "",
        username: ""
      },
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.createUserWithEmailAndPassword(this.state.user)
      .then((user) => toastr.success('User Created'))
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-12">
            <RegistrationForm
              onChange={this.updateUserState}
              onSave={this.createUser}
              saving={this.state.saving}
              user={this.state.user}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12" style={{marginTop: '30px'}}>
            <LinkContainer to="/login">
              <ButtonToolbar>
                <Button bsStyle="success">Have an acount? Login here</Button>
              </ButtonToolbar>
            </LinkContainer>
          </div>
        </div>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  actions: PropTypes.object.isRequired
};

RegistrationPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createUserWithEmailAndPassword}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

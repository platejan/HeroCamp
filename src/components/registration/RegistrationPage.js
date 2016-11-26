import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createUserWithEmailAndPassword} from '../../actions/authActions';
import RegistrationForm from './RegistrationForm';
import toastr from 'toastr';
import {LinkContainer} from 'react-router-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
const logoWhite = require('../../images/herocamp_logo_white.svg');

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

  componentDidMount() {
    let login = document.querySelector("div.bkgBlurred");
    if (login && window.innerWidth > 768) {
      login.style.marginTop = "calc( -" + login.offsetHeight + "px / 2 )";
    }
    window.addEventListener("resize", function (e) {
      let login = document.querySelector("div.bkgBlurred");
      if (login) {
        if (window.innerWidth > 768) {
          login.style.marginTop = "calc( -" + login.offsetHeight + "px / 2 )";
        } else {
          login.style.marginTop = "auto";
        }
      }
    });
  }

  render() {
    return (
      <div className="">
        <div className="login-background bkg">
          <img className="logo" src={logoWhite}/>
          <div className="autor">
            <a href="http://deligaris.deviantart.com/">image by Deligaris</a>
            <a href="https://creativecommons.org/licenses/by-nc-nd/3.0/">(license)</a>
          </div>
        </div>
        <div className="bkgBlurred login-part col-xs-12">
        <RegistrationForm
          onChange={this.updateUserState}
          onSave={this.createUser}
          saving={this.state.saving}
          user={this.state.user}
        />
        <LinkContainer to="/login">
          <button className="btn btn-default btn-danger">Have an acount? Login here</button>
        </LinkContainer>
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

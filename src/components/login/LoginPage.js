import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword, signInWithGoogle} from '../../actions/authActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';
import {LinkContainer} from 'react-router-bootstrap';
const logoWhite = require('../../images/herocamp_logo_white.svg');

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
  }

  googleLogin(event) {
    event.preventDefault;
    this.setState({saving: true});

    this.props.actions2.signInWithGoogle(this.state.user)
      .then(user => toastr.success('You are logged in'))
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
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

    this.props.actions.signInWithEmailAndPassword(this.state.user)
      .then(user => toastr.success('You are logged in'))
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  componentDidMount() {
    let login = document.querySelector("div.bkgBlurred");
    if (login && window.innerWidth >= 768) {
      login.style.marginTop = "calc( -" + login.offsetHeight + "px / 2 )";
    }
    window.addEventListener("resize", function (e) {
      let login = document.querySelector("div.bkgBlurred");
      if (login) {
        if (window.innerWidth >= 768) {
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
          <LoginForm
            onChange={this.updateUserState}
            onSave={this.createUser}
            saving={this.state.saving}
            user={this.state.user}
            onClickGoogle={this.googleLogin}/>
          <LinkContainer to="/register">
            <button className="btn btn-default btn-danger">Register now</button>
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
    actions: bindActionCreators({signInWithEmailAndPassword}, dispatch),
    actions2: bindActionCreators({signInWithGoogle}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

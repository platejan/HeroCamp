import React from 'react';
import TextInput from '../common/TextInput';

const LoginForm = ({user, onSave, onChange, saving, onClickGoogle}) => {
  return (
    <form>
      <h1>Login</h1>
      <TextInput
        name="email"
        label="Email"
        onChange={onChange}
        value={user.email}
      />

      <TextInput
        type="password"
        name="password"
        label="Password"
        onChange={onChange}
        value={user.password}
      />
      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={onSave}>Login</button>
        <button
          className="btn btn-primary"
          onClick={onClickGoogle}>Sign in with your Google Account</button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default LoginForm;

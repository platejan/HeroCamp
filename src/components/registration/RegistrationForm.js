import React from 'react';
import TextInput from '../common/TextInput';

const RegistrationForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h1>Create account</h1>
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

      <div className="form-group">
      <button
        className="btn btn-primary"
        onClick={onSave}>{saving ? 'Signing up...' : 'Sign Up'}</button>
        </div>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default RegistrationForm;

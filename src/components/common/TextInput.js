import React, {PropTypes} from 'react';

const TextInput = ({type, name, label, onChange, placeholder, value, error, className}) => {

  let typeOfInput = (type===undefined)? "text": type ;

  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let classNameString = "form-control "+className;
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type={typeOfInput}
          name={name}
          className={classNameString}
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;

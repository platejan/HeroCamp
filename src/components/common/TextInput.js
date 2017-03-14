import React, {PropTypes} from 'react';

const TextInput = ({type, name, label, onChange, placeholder, value, error, className, style={}}) => {

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
          style={style}
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
  className: PropTypes.string,
  style: React.PropTypes.object,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;

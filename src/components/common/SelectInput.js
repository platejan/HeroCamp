import React, {PropTypes} from 'react';
import Select from 'react-select';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options, multi=false}) => {
  let onChangeForSelect = function (value) {
    onChange({target: {name: name, value: value}});
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <Select
          name={name}
          value={value}
          options={options}
          onChange={onChangeForSelect}
          className=""
          multi={multi}
          clearable={false}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string,PropTypes.number,PropTypes.bool]),
  error: PropTypes.string,
  multi:PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;

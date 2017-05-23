import React from 'react';
import propTypes from 'prop-types';

const TextFieldGroup = ({ field, label, value, type, onChange, checkUserExists }) => (
  <div className="row">
    <div className="active validate">
      <input
        value={value}
        onChange={onChange}
        onBlur={checkUserExists}
        name={field}
        type={type}
        className="active validate"
        placeholder={label}
        required
      />
    </div>
  </div>
  );

TextFieldGroup.propTypes = {
  field: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  checkUserExists: propTypes.func,
  label: propTypes.string.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;

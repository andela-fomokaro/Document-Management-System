import React from 'react';
import { PropTypes } from 'prop-types';

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
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  checkUserExists: PropTypes.func,
  label: PropTypes.string.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;

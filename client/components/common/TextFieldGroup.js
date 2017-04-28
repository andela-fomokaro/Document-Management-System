import React from 'react';
// import classnames from 'classnames';
import propTypes from 'prop-types';

const TextFieldGroup = ({ field, label, value, type, onChange }) => (
  <div className="row">
    <div className="active validate">
      <input
        value={value}
        onChange={onChange}
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
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;

import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * React component for TextFieldGroup
 *
 * @param {string} field - holds the name of the input
 * @param {string} label - name of the element
 * @param {string} value - takes in the value of the input
 * @param {string} onChange - takes in an onchange event
 * @param {object} checkUserExists - checks if a user exist or not
 * 
 */
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

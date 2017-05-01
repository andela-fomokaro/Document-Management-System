import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';


class FlashMessage extends React.Component {
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div
        className={classnames('card', {
          'card green': type === 'success',
          'card red': type === 'error',
        })}
      >
        {text}
      </div>

    );
  }
}

FlashMessage.propTypes = {
  message: propTypes.object.isRequired
};
export default FlashMessage;

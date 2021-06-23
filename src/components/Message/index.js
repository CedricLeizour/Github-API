/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Message as MessageBox } from 'semantic-ui-react';

const Message = ({ message, negative }) => {
  return (
    <MessageBox negative={negative}>
      <p>
        { message }
      </p>
    </MessageBox>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  negative: PropTypes.bool,
};

Message.defaultProps = {
  negative: false,
};

export default Message;

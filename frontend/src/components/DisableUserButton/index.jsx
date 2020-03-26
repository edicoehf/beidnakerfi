import React from 'react';
import PropTypes from 'prop-types';
import { disableUser } from '../../services/apiGateway';

const handleClick = async (uid) => {
  // þarf að færa þetta ehv annað því þetta er ekki gott UX.
  await disableUser(uid);
};

const DisableUserButton = ({ userId }) => (
  <button type="button" onClick={() => handleClick(userId)}>
    Loka notanda
  </button>
);

DisableUserButton.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default DisableUserButton;

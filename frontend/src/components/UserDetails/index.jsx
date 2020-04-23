import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';

import { getUser } from '../../services/apiGateway';

const UserDetails = (props) => {
  const { drawerOpen, setDrawerOpen } = props;
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser(props.uid);

      setUser(userData);
    };

    fetchUserData();
  }, []);
  const toggleClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleClose}>
        <h1> User details koma hingað </h1>
      </Drawer>
    </>
  );
};

UserDetails.propTypes = {
  uid: PropTypes.number.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};
export default UserDetails;

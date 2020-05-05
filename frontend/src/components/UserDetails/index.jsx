import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailsForm from '../Forms/UserDetailsForm';

const useStyles = makeStyles({
  drawer: {
    width: 500,
  },
});
const UserDetails = (props) => {
  const classes = useStyles();
  const { drawerOpen, setDrawerOpen, user } = props;

  const toggleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer PaperProps={{ className: classes.drawer }} anchor="right" open={drawerOpen} onClose={toggleClose}>
        <UserDetailsForm user={user} setDrawerOpen={setDrawerOpen} />
      </Drawer>
    </>
  );
};

UserDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};
export default UserDetails;

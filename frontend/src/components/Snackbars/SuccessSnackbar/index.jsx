import React from 'react';
import SnackBar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Alert from '../Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessSnackbar = (props) => {
  const classes = useStyles();
  const { handleClose, open, successMessage } = props;
  return (
    <div className={classes.root}>
      <SnackBar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

      >
        <Alert onClose={handleClose} severity="success">
          { successMessage }
        </Alert>
      </SnackBar>
    </div>
  );
};

SuccessSnackbar.defaultProps = {
  successMessage: 'Aðgerð tókst!',
};
SuccessSnackbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
};

export default SuccessSnackbar;

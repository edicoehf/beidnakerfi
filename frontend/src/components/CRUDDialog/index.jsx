import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Toggle } from 'rsuite';

const CRUDDialog = ({
  isShowing,
  hide,
  func,
  openSnackbar,
}) => {
  const handleClick = async () => {
    func();

    openSnackbar(true);
  };
  return (isShowing ? ReactDOM.createPortal(
    <>
      <Dialog
        open={isShowing}
        onClose={hide}
      >
        <DialogTitle>Staðfesta aðgerð?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ertu viss um að þú viljir framkvæma þessa aðgerð?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={hide} color="secondary">Nei</Button>
          <Button variant="contained" onClick={handleClick} color="primary">Já</Button>
        </DialogActions>
      </Dialog>
    </>, document.body,
  ) : null);
};

CRUDDialog.defaultProps = {
  openSnackbar: () => {},
};
export default CRUDDialog;

import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, makeStyles, Button } from '@material-ui/core';

import { statusCodes } from '../../config';
import { deleteCheque, markAsPaid } from '../../services/apiGateway';

const useStyles = makeStyles((themes) => ({
  drawer: {
    width: 500,
  },
  content: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    borderBottom: '1px solid gray',
  },
  desc: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  red: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
  },
  blue: {
    display: 'flex',
    alignItems: 'center',
    color: 'blue',
  },
  green: {
    display: 'flex',
    alignItems: 'center',
    color: 'green',
  },
  orange: {
    display: 'flex',
    alignItems: 'center',
    color: 'orange',
  },
  button: {
    marginTop: themes.spacing(2),
    width: '200px',
  },

}));
const ChequeDetails = (props) => {
  const classes = useStyles();

  const { drawerOpen, setDrawerOpen, cheque, setCheque, setShouldRender } = props;
  const {
    code,
    status,
    created,
    user: {username, email},
    department: {name: depName, costsite},
  } = cheque;
  const { name: sellerName } = cheque.seller ? cheque.seller : '';
  const readableDate = new Date(created).toLocaleString('en-GB');
  const color = [classes.red, classes.blue, classes.orange, classes.green];
  const toggleClose = () => {
    setDrawerOpen(false);
  };
  const handleDelete = async () => {
    await deleteCheque(code);
    setDrawerOpen(false);

  }
  const handlePaid = async () => {
    await markAsPaid(code);
    setDrawerOpen(false);
    setCheque([]);
    setShouldRender(true);

  }

  return (
    <>
      <Drawer PaperProps={{ className: classes.drawer }} anchor="right" open={drawerOpen} onClose={toggleClose}>
        <div className={classes.content} >
            <div className={classes.row}>
              <p className={classes.desc}>Beidnanúmer: </p>
              <p className={classes.item}>{code}</p>
            </div>
            <div className={classes.row}>
              <p className={classes.desc}>Staða: </p>
              <p className={color[status]}>{statusCodes[status]}</p>
            </div>
            <div className={classes.row}>
              <p className={classes.desc}>Dagsetning: </p>
              <p className={classes.item}>{readableDate}</p>
            </div>
            <div className={classes.row}>
              <p className={classes.desc}>Kaupandi: </p>
              <p className={classes.item}>{username} - {email}</p>
            </div>
            <div className={classes.row}>
              <p className={classes.desc}>Deild: </p>
              <p className={classes.item}>{depName} - {costsite}</p>
            </div>
            <div className={classes.row}>
              <p className={classes.desc}>Seljandi: </p>
              <p className={classes.item}>{sellerName}</p>
            </div>
            {
              status === 2 ?
                <>
                  <Button onClick={handlePaid} className={classes.button} variant="contained" color="primary">Skrá sem greidd</Button>
                  <Button onClick={handleDelete} className={classes.button} variant="contained" color="primary">Hætta við beiðni</Button>
                </>
              : null
            }{
              status === 3 ?
                <>
                  <Button onClick={handlePaid} className={classes.button} variant="contained" color="primary">Skrá sem ógreidd</Button>

                </>
              : null
            }
        </div>
      </Drawer>
    </>
  );
};

ChequeDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cheque: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  setCheque: PropTypes.func.isRequired,
  setShouldRender: PropTypes.func,
};
ChequeDetails.defaultProps = {
  setShouldRender: () => {},
}
export default ChequeDetails;

// code: "03014902499054321305"
// status: 2
// created: "2020-04-27T15:46:50.527140Z"
// user: {id: 38, username: "buyer", email: "nytt@email.is"}
// department: {id: 4, name: "ITR", costsite: "5812345", organization: 4}
// seller: {id: 5, name: "Kemi", is_seller: true}
// __proto__: Object

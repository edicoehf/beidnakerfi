import React from 'react';
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

import EdicoLogo from '../EdicoLogo';

import { useAuth } from '../../context/auth';
import { getSidebarInfo } from '../../services';

const useStyles = makeStyles((themes) => ({
  button: {
    width: '90%',
    height: '60px',
    marginTop: themes.spacing(2),
  },
  buttonList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '10px',
    flexGrow: 1,
    marginLeft: themes.spacing(3),
  },
  logout: {
    marginTop: 'auto',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
}));

const Sidebar = () => {
  const { setAuthTokens } = useAuth();
  const { buttons } = getSidebarInfo();
  const classes = useStyles();

  const logOut = () => {
    setAuthTokens();
  };

  const changeColor = (path) => {
    buttons.forEach((x) => {
      if (x.path === path) {
        // eslint-disable-next-line no-param-reassign
        x.pressed = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        x.pressed = false;
      }
    });
  };

  changeColor(window.location.pathname);

  return (
    <div className={classes.sidebar}>
      <EdicoLogo />
      <div className={classes.buttonList}>
        {
          buttons.map((x) => (
            <Link to={x.path} key={x.name} className={classes.link}>
              {
                x.pressed === true ? (
                  <Button type="button" color="secondary" variant="contained" className={classes.button} onClick={() => changeColor(x.path)}>
                    {x.name}
                  </Button>
                ) : (
                  <Button type="button" color="primary" variant="contained" className={classes.button} onClick={() => changeColor(x.path)}>
                    {x.name}
                  </Button>
                )
              }
            </Link>
          ))
        }
        <Button type="button" variant="contained" color="primary" className={`${classes.button} ${classes.logout}`} onClick={() => logOut()}>
          Útskráning
        </Button>
      </div>
    </div>

  );
};

export default Sidebar;

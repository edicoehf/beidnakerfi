import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    buttons.forEach((button) => {
      if (button.path === path) {
        // eslint-disable-next-line no-param-reassign
        button.pressed = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        button.pressed = false;
      }
    });
  };

  changeColor(window.location.pathname);

  return (
    <div className={classes.sidebar}>
      <EdicoLogo />
      <div className={classes.buttonList}>
        {
          buttons.map((button) => (
            <Link to={button.path} key={button.name} className={classes.link}>
              {
                button.pressed === true ? (
                  <Button type="button" color="secondary" variant="contained" className={classes.button} onClick={() => changeColor(button.path)}>
                    {button.name}
                  </Button>
                ) : (
                  <Button type="button" color="primary" variant="contained" className={classes.button} onClick={() => changeColor(button.path)}>
                    {button.name}
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

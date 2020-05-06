import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EdicoLogo from '../../img/edico-logo.png';

const useStyles = makeStyles((themes) => ({
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    alignItems: 'center',
    marginTop: themes.spacing(2),
  },
  logo: {
    paddingTop: '10px',
    width: '90%',
    maxWidth: '300px',
  },
  text: {
    ...themes.typography.button,
  },
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.imgContainer}>
      <img className={classes.logo} src={EdicoLogo} alt="logo" />
      <div className={classes.text}>Beiðnakerfi</div>
    </div>
  );
};
export default Logo;

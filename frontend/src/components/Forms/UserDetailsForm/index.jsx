import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, TextField, makeStyles, List, ListItem, ListSubheader,
} from '@material-ui/core';

import { updateUser } from '../../../services/apiGateway';

const useStyles = makeStyles((themes) => ({
  form: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputField: {
    width: '80%',
  },
  button: {
    marginTop: themes.spacing(2),
    width: '200px',
  },
}));


const UserDetailsForm = (props) => {
  const { handleSubmit, register } = useForm();
  const { user } = props;
  const [userData, setUserData] = useState(user);

  const isSuperUser = JSON.parse(localStorage.getItem('tokens')).is_superuser;
  const classes = useStyles();

  const onSubmit = async () => {
    const { id, username, email } = userData;
    await updateUser({ id, username, email });
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="username"
          label="Notendanafn"
          inputRef={register}
          type="text"
          className={classes.inputField}
          value={userData.username}
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
        />
        <TextField
          name="email"
          label="Email"
          inputRef={register}
          type="email"
          className={classes.inputField}
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <TextField
          name="organization"
          label="Fyrirtæki"
          inputRef={register}
          type="text"
          disabled
          className={classes.inputField}
          value={userData.organization.name}
        />
        {
          !user.organization.is_seller ? (
            <>
              <List
                component="nav"
                subheader={(
                  <ListSubheader component="div">
                    Deildir
                  </ListSubheader>
                )}
                color="primary"
              >
                {
                  user.departments.map((dept) => <ListItem key={dept.id}>{ dept.name }</ListItem>)
                }
              </List>
            </>
          ) : null
        }
        <Button type="submit" className={classes.button} variant="contained" color="primary">Vista breytingar</Button>
        {
          // eslint-disable-next-line no-nested-ternary
          isSuperUser
            ? user.isActive
              ? <Button type="button" className={classes.button} variant="contained" color="primary">Loka aðgang</Button>
              : <Button type="button" className={classes.button} variant="contained" color="primary">Opna aðgang</Button>
            : null
        }
        {
          isSuperUser ? <Button type="button" className={classes.button} variant="contained" color="primary">Breyta lykilorði</Button> : null
        }
      </form>
    </>
  );
};

UserDetailsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};
export default UserDetailsForm;

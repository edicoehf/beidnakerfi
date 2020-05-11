import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CRUDDialog from '../../CRUDDialog';
import DepartmentList from '../../Lists/DepartmentList';

import {
  updateUser,
  deactivateUser,
  activateUser,
  changeUserPassword,
  isSeller,
} from '../../../services/apiGateway';
import useDialog from '../../../hooks/useDialog';

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
    marginTop: '20px',
  },
  button: {
    marginTop: themes.spacing(2),
    width: '200px',
  },
  switch: {
    marginTop: themes.spacing(4),
  },
}));


const UserDetailsForm = (props) => {
  const { handleSubmit, register } = useForm();
  const { user, setDrawerOpen } = props;
  const [userData, setUserData] = useState({ ...user, oldPassword: '', newPassword: '' });
  const [isDeptManager, setIsDeptManager] = useState(user.is_manager);
  const isSuperUser = JSON.parse(localStorage.getItem('tokens')).is_superuser;
  const classes = useStyles();
  const { isShowing, toggle } = useDialog();
  const [callBack, setCallBack] = useState(() => {});

  const onSubmit = async () => {
    const { id, username, email } = userData;
    await updateUser({
      id, username, email, isDeptManager,
    });

    setDrawerOpen(false);
  };

  const handlePasswordChange = async () => {
    const { newPassword, oldPassword, id } = userData;
    await changeUserPassword(id, newPassword, oldPassword);

    setDrawerOpen(false);
  };

  const isViewingHimself = () => {
    const viewingId = userData.id;
    const selfId = JSON.parse(localStorage.getItem('tokens')).id;

    return viewingId === selfId;
  };

  const handleSwitchChange = () => {
    setIsDeptManager((prev) => !prev);
  };

  const userActivate = () => {
    activateUser(userData.id);
    setDrawerOpen(false);
  };

  const userDeactivate = () => {
    deactivateUser(userData.id);
    setDrawerOpen(false);
  };

  const handleButtonClick = (func) => {
    setCallBack(() => () => func());
    toggle();
  };

  return (
    <>
      <form className={classes.form}>
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
        { isViewingHimself()
          ? (
            <TextField
              name="oldpassword"
              label="Gamalt lykilorð"
              inputRef={register}
              type="password"
              className={classes.inputField}
              value={userData.oldpassword}
              onChange={(e) => {
                setUserData({ ...userData, oldPassword: e.target.value });
              }}
            />
          ) : null}
        <TextField
          name="newpassword"
          label="Nýtt lykilorð"
          inputRef={register}
          type="password"
          className={classes.inputField}
          value={userData.newpassword}
          onChange={(e) => {
            setUserData({ ...userData, newPassword: e.target.value });
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
          isSuperUser && !isSeller() ? (
            <FormControlLabel
              className={classes.switch}
              control={<Switch checked={isDeptManager} onChange={handleSwitchChange} name="deptManager" />}
              label="Deildarstjóri"
              inputRef={register}
            />
          ) : null
        }
        {
          !user.organization.is_seller ? (
            <>
              <DepartmentList departments={user.departments} />
            </>
          ) : null
        }

        <Button type="button" onClick={() => handleButtonClick(onSubmit)} className={classes.button} variant="contained" color="primary">Vista breytingar</Button>
        {
          // eslint-disable-next-line no-nested-ternary
          isSuperUser
            ? user.is_active
              ? <Button type="button" className={classes.button} variant="contained" color="primary" onClick={() => handleButtonClick(userDeactivate)}>Loka aðgang</Button>
              : <Button type="button" className={classes.button} variant="contained" color="primary" onClick={() => handleButtonClick(userActivate)}>Opna aðgang</Button>
            : null
        }
        {
          isSuperUser || isViewingHimself() ? <Button type="button" className={classes.button} variant="contained" onClick={() => handleButtonClick(handlePasswordChange)} color="primary">Breyta lykilorði</Button> : null
        }
      </form>
      <CRUDDialog
        isShowing={isShowing}
        hide={toggle}
        func={callBack}
      />
    </>
  );
};

UserDetailsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};
export default UserDetailsForm;

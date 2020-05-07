import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';

import { getDepartments, createUser } from '../../../services/apiGateway';

const useStyles = makeStyles((themes) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: themes.spacing(5),
  },

  button: {
    width: '180px',
    height: '50px',
    marginTop: themes.spacing(2),
    marginLeft: 'auto',
  },

  inputField: {
    width: '100%',
    marginTop: themes.spacing(2),
  },

  switch: {
    marginLeft: 'auto',
    marginTop: themes.spacing(2),
    marginBottom: themes.spacing(5),
  },
}));


const CreateUserForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [costSites, setCostSites] = useState([]);
  const [deptValue, setDeptValue] = useState('');
  const [isDeptManager, setIsDeptManager] = useState(false);
  const classes = useStyles();
  const isSeller = JSON.parse(localStorage.getItem('tokens')).org_seller;
  const isSuperUser = JSON.parse(localStorage.getItem('tokens')).is_superuser;
  const { setOpen, setErrorOpen } = props;
  useEffect(() => {
    const fetchCostSites = async () => {
      const result = await getDepartments();
      setCostSites(result);
    };

    fetchCostSites();
  }, []);

  const onSubmit = async (data) => {
    const result = await createUser({ ...data, department: deptValue });
    if (result.status === 201 || result.status === 200) {
      setOpen(true);
    } else {
      setErrorOpen(true);
    }
  };

  const handleDeptChange = (e) => {
    setDeptValue(e.target.value);
  };

  const handleSwitchChange = () => {
    setIsDeptManager((prev) => !prev);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="username"
        label="Notendanafn"
        required
        inputRef={register}
        autoFocus
        className={classes.inputField}
      />
      <TextField
        name="password"
        type="password"
        label="Lykilorð"
        required
        inputRef={register}
        className={classes.inputField}
      />
      <TextField
        name="email"
        type="email"
        label="Netfang"
        required
        inputRef={register}
        className={classes.inputField}
      />
      {
        !isSeller ? (
          <>
            <Select
              name="department"
              className={classes.inputField}
              value={deptValue}
              onChange={handleDeptChange}
              autoWidth={false}
              label="Deild"
              required
            >
              <MenuItem value="">
                Deild
              </MenuItem>
              {
              costSites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))
            }
            </Select>
            {
              isSuperUser ? (
                <FormControlLabel
                  className={classes.switch}
                  control={<Switch checked={isDeptManager} onChange={handleSwitchChange} name="deptManager" />}
                  label="Deildarstjóri"
                  inputRef={register}
                />
              ) : null
            }
          </>
        ) : null
      }
      <Button color="primary" variant="contained" className={classes.button} type="submit">
        Skrá starfsmann
      </Button>
    </form>
  );
};

CreateUserForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setErrorOpen: PropTypes.func.isRequired,
};

export default CreateUserForm;

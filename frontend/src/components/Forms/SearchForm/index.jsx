import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((themes) => ({
  search: {
    marginTop: themes.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },

  inputField: {
    width: '80%',
  },

  searchButton: {
    width: '10%',
    height: '35px',
    marginLeft: themes.spacing(2),
  },
}));
const SearchForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    props.setSearch(data.query);
    props.setShouldRender(true);
  };

  return (
    <form className={classes.search} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={classes.inputField}
        fullWidth
        name="query"
        type="text"
        label="Leitarstrengur"
        inputRef={register}
        autoFocus
      />
      <Button className={classes.searchButton} variant="contained" color="primary" type="submit">
        Leita
      </Button>
    </form>

  );
};

SearchForm.defaultProps = {
  setSearch: () => {},
  setShouldRender: () => {},
};

SearchForm.propTypes = {
  setSearch: PropTypes.func,
  setShouldRender: PropTypes.func,
};

export default SearchForm;

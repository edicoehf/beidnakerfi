import React from 'react';
import PropTypes from 'prop-types';
import '../Forms.css';
import {
  TextField,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((themes) => ({
  search: {
    marginTop: themes.spacing(5),
    display: 'flex',
    width: '100%',

  },
}));
const SearchForm = (props) => {
  const classes = useStyles();

  const handleChange = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <form className={classes.search}>
      <TextField
        onChange={handleChange}
        className="inputField"
        name="query"
        type="text"
        label="Leitarstrengur"
        autoFocus
      />
    </form>

  );
};

SearchForm.defaultProps = {
  setSearch: () => {},
};

SearchForm.propTypes = {
  setSearch: PropTypes.func,
};

export default SearchForm;

import React from 'react';
import PropTypes from 'prop-types';
import '../Forms.css';
import { TextField } from '@material-ui/core';

const SearchForm = (props) => {
  const handleChange = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <>
      <form className="searchForm">
        <TextField
          onChange={handleChange}
          className="inputField"
          name="query"
          type="text"
          label="Stimplaðu inn notendanafn"
          autoFocus
        />
      </form>
    </>
  );
};

SearchForm.defaultProps = {
  setSearch: () => {},
};

SearchForm.propTypes = {
  setSearch: PropTypes.func,
};

export default SearchForm;

import React from 'react';
import PropTypes from 'prop-types';
import '../Forms.css';

const SearchForm = (props) => {
  const handleChange = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <>
      <form className="searchForm">
        <input
          onChange={handleChange}
          className="inputField"
          name="query"
          type="text"
          placeholder="Leitarstrengur"
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
